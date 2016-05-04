var articles = [];
var categories = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHtml = function(scriptTemplateId) {
  var template = Handlebars.compile($(scriptTemplateId).html());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

  ourLocalData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  ourLocalData.forEach(function(ele) {
    articles.push(new Article(ele));
  });

articles.forEach(function(a) {
  $('#articles').append(a.toHtml('#article-template'));
  $('#author-filter').append(a.toHtml('#author-filter-template'));

  if(categories.indexOf(a.category) === -1) {
    $('#category-filter').append(a.toHtml('#category-filter-template'));
    categories.push(a.category);
  };
});
