document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const contentArea = document.getElementById('content-area');

    const pages = [
        { name: 'ᠨᠢᠭᠡᠳᠦᠭᠡᠷ', file: 'page1.html' }, // 第一页
        { name: 'ᠬᠣᠶᠠᠳᠤᠭᠠᠷ', file: 'page2.html' }, // 第二页
        { name: 'ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ', file: 'page3.html' }  // 第三页
    ];

    // 生成导航菜单
    const ul = document.createElement('ul');
    pages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = page.name;
        a.dataset.file = page.file;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            loadPage(page.file);
        });
        li.appendChild(a);
        ul.appendChild(li);
    });
    nav.appendChild(ul);

    // 加载页面内容的函数
    function loadPage(fileName) {
        fetch(fileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                contentArea.innerHTML = `<div class="page-content">${html}</div>`;
            })
            .catch(error => {
                console.error('Error loading page:', error);
                contentArea.innerHTML = `<p>Error loading content for ${fileName}.</p>`;
            });
    }

    // 默认加载第一页
    if (pages.length > 0) {
        loadPage(pages[0].file);
    }
});
