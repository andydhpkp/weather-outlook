//make the enter key act as the search button
var searchContent = document.querySelector('#citySearch');
searchContent.addEventListener('keyup', event => {
    if(event.key !== 'Enter') return; 
    document.querySelector('#citySearchBtn').click();
    event.preventDefault();
})