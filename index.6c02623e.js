var e;(e="cat",fetch(`https://pixabay.com/api/?key=36692460-95aa8d63e830b1b263bde2e89&q=${e}&image_type=photo&orientation=horizontal&safesearch=true`).then((e=>{if(!e.ok)throw console.clear(),new Error(e.status);return e.json()}))).then((e=>{console.log(e)}));
//# sourceMappingURL=index.6c02623e.js.map
