/* Blog: renders the post list (blog.html) and article view (blog-post.html) */
(function () {
  "use strict";

  /* ---------- Article view (blog-post.html?post=slug) ---------- */
  var params = new URLSearchParams(location.search);
  var slug = params.get("post");
  var post = null;
  if (slug) {
    for (var i = 0; i < POSTS.length; i++) {
      if (POSTS[i].slug === slug) { post = POSTS[i]; break; }
    }
  }

  if (post) {
    document.title = post.title + " | ai.engineer";
    document.querySelector('meta[name="description"]').content = post.excerpt;
    document.getElementById("post-cat").textContent = post.category;
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-meta").textContent = post.date + " \u2022 " + post.readTime + " read";
    var body = document.getElementById("post-body");
    body.innerHTML = "";
    post.body.forEach(function (block) {
      var el = document.createElement(block[0]);
      if (block[0] === "p") el.textContent = block[1];
      else el.textContent = block[1];
      body.appendChild(el);
    });
  } else if (slug) {
    document.getElementById("post-title").textContent = "Article not found";
    document.getElementById("post-body").innerHTML = '<p>This article doesn\'t exist. <a href="blog.html" style="color:var(--accent)">Back to the blog.</a></p>';
  }

  /* ---------- List view (blog.html) ---------- */
  var list = document.getElementById("blog-list");
  if (list) {
    var filters = document.querySelectorAll("#blog-filters button");
    var filter = "All";

    function render() {
      list.innerHTML = "";
      POSTS.filter(function (p) { return filter === "All" || p.category === filter; }).forEach(function (p) {
        var a = document.createElement("a");
        a.className = "card card-link";
        a.href = "blog-post.html?post=" + encodeURIComponent(p.slug);
        a.style.display = "block";
        a.style.marginBottom = "1.25rem";
        a.innerHTML =
          '<p class="post-meta">' + p.category + " \u2022 " + p.date + " \u2022 " + p.readTime + " read</p>" +
          "<h3>" + p.title + "</h3>" +
          "<p>" + p.excerpt + "</p>" +
          '<div style="margin-top:1rem"><span class="section-label" style="margin-bottom:0">Read article &rarr;</span></div>';
        list.appendChild(a);
      });
    }

    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        filter = btn.dataset.filter;
        render();
      });
    });

    render();
  }
})();
