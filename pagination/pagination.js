function pagination(currentPage, itemCount, itemsPerPage, adjacentCount) {
	let pages = [];
	let htmlString = "";
	htmlString += "<div>\n"
	pages.push("<div>\n")
	let showPreNext = true;
	let firstPage = 1;
	let lastPage = Math.ceil(itemCount / itemsPerPage);
	if (lastPage == 1) {
		return;
	}

	var firstAdjacentPage, lastAdjacentPage
	if (currentPage <= adjacentCount * 2) {
		firstAdjacentPage = firstPage;
		lastAdjacentPage = Math.min(firstPage + (2 * adjacentCount), lastPage);
	} else if (currentPage > lastPage - (2 * adjacentCount)) {
		lastAdjacentPage = lastPage
		firstAdjacentPage = lastPage - (2 * adjacentCount);
	} else {
		firstAdjacentPage = currentPage - adjacentCount;
		lastAdjacentPage = currentPage + adjacentCount;
	}

	//Previous Link
	if (currentPage == firstPage) {
		htmlString += "\t<span>&lt;</span>\n";
		pages.push("\t<span>&lt;</span>\n")
	} else {
		htmlString += `\t<a href="?page=${currentPage-1}" class="prev">${currentPage - 1}</a>\n`;
		pages.push(`\t<a href="?page=${currentPage-1}" class="prev">${currentPage - 1}</a>\n`)
	}

	//firstPage
	if(firstAdjacentPage > firstPage){
		htmlString += `\t<a href="#">${firstPage}</a>\n`;
		pages.push(`\t<a href="#">${firstPage}</a>\n`)
		if (firstAdjacentPage > firstPage + 1) {
			htmlString += "\t<span>...</span>\n"
			pages.push( "\t<span>...</span>\n")
		}
	}

	let idx = 0;
	for (idx = firstAdjacentPage; idx <= lastAdjacentPage; idx++) {
		if (currentPage == idx) {
			htmlString += `\t<b> ${idx} </b>\n`
			pages.push(`\t<b> ${idx} </b>\n`)
		} else {
			htmlString += `\t<a href=\"#\">${idx}</a>\n`;
			pages.push(`\t<a href=\"#\">${idx}</a>\n`)
		}
	}

	if (lastAdjacentPage < lastPage) {
		if (lastAdjacentPage < lastPage - 1) {
			htmlString += "\t<span>...</span>\n";
			pages.push("\t<span>...</span>\n")
		}
		htmlString += `\t<a href="#">${lastPage}</a>\n`;
		pages.push(`\t<a href="#">${lastPage}</a>\n`)
	}

	//Next Link
	if (currentPage == lastPage) {
		htmlString += `\t<span>&gt;</span>\n`;
		pages.push("`\t<span>&gt;</span>\n`")
	} else {
		htmlString += `\t<a href="?page=${currentPage + 1}" class="next">&gt;</a>\n`;
		pages.push(`\t<a href="?page=${currentPage + 1}" class="next">&gt;</a>\n`)
	}

	htmlString += "</div>"
	pages.push("</div>")
	//console.log(htmlString);

	pages.forEach(item => console.log(item));
}

pagination(1, 199, 20, 2);