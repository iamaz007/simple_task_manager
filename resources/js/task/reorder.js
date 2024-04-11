const initSorting = (e,callback) => {
    const sortableList = document.getElementById(e);

    let dragStartIndex;

    function dragStart() {
        dragStartIndex = + this.getAttribute('data-index');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragDrop() {
        const dragEndIndex = + this.getAttribute('data-index');
        swapItems(dragStartIndex, dragEndIndex);
    }

    function swapItems(fromIndex, toIndex) {
        const itemOne = sortableList.querySelector(`[data-index="${fromIndex}"]`);
        const itemTwo = sortableList.querySelector(`[data-index="${toIndex}"]`);

        // const itemOneId = sortableList.querySelector(`[data-id="${fromIndex}"]`).attributes.getNamedItem('data-id');
        // const itemTwoId = sortableList.querySelector(`[data-id="${toIndex}"]`);
        // console.log($(itemOne).attr('data-id'))
        // console.log($(itemTwo).attr('data-id'))

        const temp = itemOne.innerHTML;
        itemOne.innerHTML = itemTwo.innerHTML;
        itemTwo.innerHTML = temp;

        const sortedData = {
            'item_1': {
                'task_id': $(itemOne).attr('data-id'),
                'task_priority': toIndex,
            },
            'item_2': {
                'task_id': $(itemTwo).attr('data-id'),
                'task_priority': fromIndex,
            },
        }

        console.log(sortedData)
        callback(sortedData);
    }

    function dragEnter() {
        this.classList.add('over');
    }

    function dragLeave() {
        this.classList.remove('over');
    }

    function dragEnd() {
        this.classList.remove('over');
    }

    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('dragend', dragEnd);
    });
}

export { initSorting }