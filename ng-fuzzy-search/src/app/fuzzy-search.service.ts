
import { Injectable } from '@angular/core';

@Injectable()
export class FuzzySearchService {

  // Return all elements of `array` that have a fuzzy
  // match against `pattern`.
  searchSimple(pattern: string, arr: Array<string>) {
    return arr.filter(str => {
      return this.test(pattern, str);
    });
  }


  search(pattern: string, arr: Array<any>, opts?: FilterOptions<any>): FilterResult<any>[]{
    if (!arr || arr.length === 0) {
      return [];
    }
    if (typeof pattern !== 'string') {
      return arr;
    }
    opts = opts || {};

    return arr
      .reduce((prev, element, idx, arr) => {
        // let str = element;
        let str = '';
        if (opts.extract) {
          str = opts.extract(element);
        }
        var rendered = this.match(pattern, str, opts);
        if (rendered != null) {
          prev[prev.length] = {
            string: rendered.rendered,
            score: rendered.score,
            index: idx,
            original: element
          };
        }
        return prev;
      }, [])

      // Sort by score. Browsers are inconsistent wrt stable/unstable
      // sorting, so force stable by using the index in the case of tie.
      // See http://ofb.net/~sethml/is-sort-stable.html
      .sort(function(a, b) {
        var compare = b.score - a.score;
        if (compare) return compare;
        return a.index - b.index;
      });
  }

  private match(pattern: string, str: string, opts?: MatchOptions): MatchResult {
    opts = opts || {};
    let patternIdx = 0;
    let result = [];
    let len = str.length;
    let totalScore = 0;
    let currScore = 0;
    let pre = opts.pre || '';
    let post = opts.post || '';
    let compareString = opts.caseSensitive && str || str.toLowerCase();

    let ch: any;
    pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

    // For each character in the string, either add it to the result
    // or wrap in template if it's the next string in the pattern
    for (let idx = 0; idx < len; idx++) {
      ch = str[idx];
      if (compareString[idx] === pattern[patternIdx]) {
        ch = pre + ch + post;
        patternIdx += 1;

        // consecutive characters should increase the score more than linearly
        currScore += 1 + currScore;
      } else {
        currScore = 0;
      }
      totalScore += currScore;
      result[result.length] = ch;
    }

    // return rendered string if we have a match for every char
    if (patternIdx === pattern.length) {
      // if the string is an exact match with pattern, totalScore should be maxed
      totalScore = (compareString === pattern) ? Infinity : totalScore;
      return {
        rendered: result.join(''),
        score: totalScore
      };
    }

    return null;
  }

  private test(pattern: string, str: string): boolean {
    return this.match(pattern, str) !== null;
  }

}

export interface FilterOptions<T> {
  pre?: string;
  post?: string;
  extract?(input: T): string;
}

export interface FilterResult<T> {
  string: string;
  score: number;
  index: number;
  original: T;
}

export interface MatchOptions {
  pre?: string;
  post?: string;
  caseSensitive?: boolean;
}

export interface MatchResult {
  rendered: string;
  score: number;
}
