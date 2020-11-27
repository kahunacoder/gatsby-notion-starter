
const puppeteer = require('puppeteer');

process.setMaxListeners(0)

const getPageHtml = async (url) => {
    const puppeteer_options = { headless: true, args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'] }
    if (process.env.CHROME_BIN !== '') {
        puppeteer_options.executablePath = process.env.CHROME_BIN || null;
    }
    const browser = await puppeteer.launch(puppeteer_options);
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('#notion-app');
    await page.waitFor(24000);
    const data = await page.evaluate(() => {
        // 图片链接转换
        document.querySelectorAll('div.notion-page-content  img').forEach(item => {
            if (item.src.startsWith("https://s3.us-west")) {
                let [parsedOriginUrl] = item.src.split("?")
                item.src = `https://notion.so/image/${encodeURIComponent(parsedOriginUrl).replace("s3.us-west", "s3-us-west")}`
            } else {
                item.src = item.src
            }
        })

        // TOC 链接转化
        let qs = "#notion-app > div > div.notion-cursor-listener > div > div.notion-scroller.vertical.horizontal > div.notion-page-content > div > div:nth-child(1) > div > a"
        document.querySelectorAll(qs).forEach(item => {
            // 真是服了，puppeteer传个函数这么麻烦。🤯
            const getFullBlockId = (blockId) => {
                if (typeof blockId !== 'string') {
                    throw Error(`blockId: ${typeof blockId} must be string`)
                }
                if (blockId.match("^[a-zA-Z0-9]+$")) {
                    return blockId.substr(0, 8) + "-"
                        + blockId.substr(8, 4) + "-"
                        + blockId.substr(12, 4) + "-"
                        + blockId.substr(16, 4) + "-"
                        + blockId.substr(20, 32)
                } else {
                    return blockId
                }
            }

            let u
            try {
                u = new URL(item.href)
            } catch (error) {
                console.log(error)
            }

            if (u && u.host === 'www.notion.so') {
                let hashBlockID = getFullBlockId(item.hash.slice(1))
                item.href = `#${hashBlockID}`

                let block = document.querySelector(`div[data-block-id="${hashBlockID}"]`)
                if (block) {
                    block.id = hashBlockID
                }
            }
        });

        // bookmark 修复，notion更改了 bookmark block 的生成规则，a 标签内没有 href了
        document.querySelectorAll("#notion-app > div > div.notion-cursor-listener > div > div.notion-scroller.vertical.horizontal > div.notion-page-content > div[data-block-id] > div > div > a").forEach(a => {
            if (!a.href) {
                a.href = a.querySelector("div > div:first-child > div:last-child").innerText
            }
        })
        // 表格视图 CSS 修复
        document.querySelectorAll("div.notion-scroller.horizontal").forEach(item => {
            item.children[0].style.padding = 0
            item.previousElementSibling.style.paddingLeft = 0
            // 表格在 safari & edge 中显示有问题。
            item.style.overflowX = "scroll"
        })
        // 文章内容
        let content = document.querySelector('#notion-app > div > div.notion-cursor-listener > div > div > div.notion-page-content')


        // 可编辑内容修复
        let contenteditable = content.querySelectorAll("div[contenteditable=true]")
        contenteditable.forEach(i => {
            i.setAttribute("contenteditable", false)
            i.setAttribute("notion", true)
            // i.className += "text-blue-txt ";
        })

        // Notion light theme color values and replacement classes
        const colors = {
            "text": [
                {
                    "styleColor": "rgb(55, 53, 47)",
                    "cssClass": "text-notion-DEFAULT-txt"
                },
                {
                    "styleColor": "rgba(55, 53, 47, 0.6)",
                    "cssClass": "text-notion-gray-txt"
                },
                {
                    "styleColor": "rgb(217, 115, 13)",
                    "cssClass": "text-notion-orange-txt"
                },
                {
                    "styleColor": "rgb(224, 62, 62)",
                    "cssClass": "text-notion-red-txt"
                },
                {
                    "styleColor": "rgb(105, 64, 165)",
                    "cssClass": "text-notion-purple-txt"
                },
                {
                    "styleColor": "rgb(100, 71, 58)",
                    "cssClass": "text-notion-brown-txt"
                },
                {
                    "styleColor": "rgb(173, 26, 114)",
                    "cssClass": "text-notion-pink-txt"
                },
                {
                    "styleColor": "rgb(223, 171, 1)",
                    "cssClass": "text-notion-yellow-txt"
                },
                {
                    "styleColor": "rgb(11, 110, 153)",
                    "cssClass": "text-notion-blue-txt"
                },
                {
                    "styleColor": "rgb(15, 123, 108)",
                    "cssClass": "text-notion-green-txt"
                }
            ],
            "background": [
                {
                    "styleColor": "rgb(255, 255, 255)",
                    "cssClass": "bg-notion-DEFAULT-bkg"
                },
                {
                    "styleColor": "rgb(235, 236, 237)",
                    "cssClass": "bg-notion-gray-bkg"
                },
                {
                    "styleColor": "rgb(250, 235, 221)",
                    "cssClass": "bg-notion-orange-bkg"
                },
                {
                    "styleColor": "rgb(251, 228, 228)",
                    "cssClass": "bg-notion-red-bkg"
                },
                {
                    "styleColor": "rgb(234, 228, 242)",
                    "cssClass": "bg-notion-purple-bkg"
                },
                {
                    "styleColor": "rgb(233, 229, 227)",
                    "cssClass": "bg-notion-brown-bkg"
                },
                {
                    "styleColor": "rgb(244, 223, 235)",
                    "cssClass": "bg-notion-pink-bkg"
                },
                {
                    "styleColor": "rgb(251, 243, 219)",
                    "cssClass": "bg-notion-yellow-bkg"
                },
                {
                    "styleColor": "rgb(221, 235, 241)",
                    "cssClass": "bg-notion-blue-bkg"
                },
                {
                    "styleColor": "rgb(221, 237, 234)",
                    "cssClass": "bg-notion-green-bkg"
                },
                {
                    "styleColor": "rgb(247, 246, 243)",
                    "cssClass": "bg-notion-code-bkg"
                }
            ]
        }

        // Loop through all content elements and remove notion color and
        // background styles and relace with class names.

        let hasColor = content.querySelectorAll("*")
        hasColor.forEach(i => {

            if (i.style.maxWidth == "608px" || i.style.maxWidth == "800px") {
                i.style.maxWidth = "1048px";
            }

            let backgroundsToClasses = colors.background.map(item => {
                if (i.style.background == item.styleColor) {
                    i.style.removeProperty("background");
                    return item.cssClass
                }
            }).join('')
            if (backgroundsToClasses) {
                i.classList.add(backgroundsToClasses);
            }

            let colorsToClasses = colors.text.map(item => {
                if (i.style.color == item.styleColor) {
                    i.style.removeProperty("color");
                    return item.cssClass
                }
            }).join('')
            if (colorsToClasses) {
                i.classList.add(colorsToClasses);
            }
        })

        if (content) {
            return content.innerHTML
        }
        else {
            return 'error'
        }
    })

    await browser.close();
    return data
}

module.exports = getPageHtml