import path from 'path';
import {correct, StageTest, wrong} from 'hs-test-web';

const pagePath = path.join(import.meta.url, '../../src/index.html');


class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [ this.page.execute(() => {
        // test #1
        // HELPERS-->
        // method to check if element with id exists
        this.elementExists = (id, nodeNames) => {
            const element = document.body.querySelector(id);
            if (!element) return true;
            else return (nodeNames && !nodeNames.includes(element.nodeName.toLowerCase()));
        };

        // method to check if element with id has right text
        this.elementHasText = (id, correctText) => {
            const element = document.body.querySelector(id);
            if (!element) return true;

            if (correctText) {
                return !element.innerText.includes(correctText);
            }
            return !element.innerText || element.innerText.trim().length === 0;
        };

        // method to check if element with id has right attribute
        this.elementHasAttribute = (id, attribute, value) => {
            const element = document.body.querySelector(id);
            if (!element) return true;
            const attributeValue = element.getAttribute(attribute);
            if (attributeValue === null) return true;
            if (value) return attributeValue !== value;
            return false;
        };

        // method to check if element exist in the specified amount
        this.elementExistsInAmount = (id, amount) => {
            const elements = document.body.querySelectorAll(id);
            return elements.length !== amount;
        }


        // CONSTANTS-->
        const theElement = "The element with the selector of";
        // <--CONSTANTS

        // MESSAGES-->
        this.missingElementMsg = (selector) => {
            return `${theElement} "${selector}" is missing in the body of the HTML document.`;
        };
        this.wrongTagMsg = (id, tag, tagAlt) => {
            if (tagAlt) return `${theElement} "${id}" should be a/an ${tag} or ${tagAlt} tag.`;
            else return `${theElement} "${id}" should be a/an ${tag} tag.`;
        };
        this.wrongTextMsg = (id, text) => {
            return `${theElement} "${id}" should have the text: "${text}".`;
        };
        this.missingTextMsg = (id) => {
            return `${theElement} "${id}" should have some text.`;
        };
        this.wrongAttributeMsg = (id, attribute, value) => {
            return `${theElement} "${id}" should have the attribute "${attribute}" with the value "${value}".`;
        };
        this.missingAttributeMsg = (id, attribute) => {
            return `${theElement} "${id}" should have the attribute "${attribute}".`;
        }
        this.wrongAmountOfElementsMsg = (id, amount) => {
            return `There should be "${amount}" elements with the selector of "${id}" in the body of the HTML document.`;
        }
        this.wrongElementOrderMsg = (id, afterEl) => {
            return `${theElement} "${id}" should be after the "${afterEl}" element in the body of the HTML document.`;
        }
        // <--MESSAGES
        return correct();

    }), this.page.execute(() => {
        // test #2
        // HEADER TAGS

        // check if header exists
        if (this.elementExists("header")) return wrong(this.missingElementMsg("header"));

        // check if h1 exists in header
        const h1 = "header > h1";
        if (this.elementExists(h1)) return wrong(this.missingElementMsg(h1));

        // check if h1 has text
        if (this.elementHasText(h1)) return wrong(this.missingTextMsg(h1));

        // check if nav exists in header
        const nav = "header > nav";
        if (this.elementExists(nav)) return wrong(this.missingElementMsg(nav));

        // check if ul exists in nav
        const ul = "header > nav > ul";
        if (this.elementExists(ul)) return wrong(this.missingElementMsg(ul));

        // check if 5 li exists in ul
        const li = "header > nav > ul > li";
        if (this.elementExistsInAmount(li, 5)) return wrong(this.wrongAmountOfElementsMsg(li, 5));

        // check if 5 a exists in li
        const link = "header > nav > ul > li > a";
        if (this.elementExistsInAmount(link, 5)) return wrong(this.wrongAmountOfElementsMsg(link, 5));

        // check if link has text and href
        for (let i = 1; i <= 5; i++) {
            const link = `header > nav > ul > li:nth-child(${i}) > a`;
            if (this.elementHasText(link)) return wrong(this.missingTextMsg(link));

            if (this.elementHasAttribute(link, "href"))
                return wrong(this.missingAttributeMsg(link, "href"));
        }

        return correct();
    }), this.page.execute(() => {
        // test #3
        // ASIDE TAGS

        // check if aside exists
        if (this.elementExists("aside")) return wrong(this.missingElementMsg("aside"));

        // check if aside after header
        const aside = "header ~ aside";
        if (this.elementExists(aside)) return wrong(this.wrongElementOrderMsg("aside", "header"));

        // check if h2 exists in aside
        const h2 = "aside > h2";
        if (this.elementExists(h2)) return wrong(this.missingElementMsg(h2));

        // check if h2 has text
        if (this.elementHasText(h2)) return wrong(this.missingTextMsg(h2));

        // check if ol exists in aside
        const ol = "aside > ol";
        if (this.elementExists(ol)) return wrong(this.missingElementMsg(ol));

        // check if ol has type attribute
        if (this.elementHasAttribute(ol, "type")) return wrong(this.missingAttributeMsg(ol, "type"));

        // check if ol has type I
        if (this.elementHasAttribute(ol, "type", "I")) return wrong(this.wrongAttributeMsg(ol, "type", "I"));

        // check if 3 li exists in ol
        const li = "aside > ol > li";
        if (this.elementExistsInAmount(li, 3)) return wrong(this.wrongAmountOfElementsMsg(li, 3));

        // check if 3 a exists in li
        const link = "aside > ol > li > a";
        if (this.elementExistsInAmount(link, 3)) return wrong(this.wrongAmountOfElementsMsg(link, 3));

        // check if link has text and href
        for (let i = 1; i <= 3; i++) {
            const link = `aside > ol > li:nth-child(${i}) > a`;
            if (this.elementHasText(link)) return wrong(this.missingTextMsg(link));

            if (this.elementHasAttribute(link, "href"))
                return wrong(this.missingAttributeMsg(link, "href"));
        }

        return correct();
    }), this.page.execute(() => {
        // test #4
        // MAIN TAGS

        // check if main exists
        if (this.elementExists("main")) return wrong(this.missingElementMsg("main"));

        // check if main after aside
        const main = "aside ~ main";
        if (this.elementExists(main)) return wrong(this.wrongElementOrderMsg("main", "aside"));

        // check if section exists in main
        const section = "main > section";
        if (this.elementExists(section)) return wrong(this.missingElementMsg(section));

        // check if article1 exists in section
        const article1 = "main > section > article:nth-child(1)";
        if (this.elementExists(article1)) return wrong(this.missingElementMsg(article1));

        // check if h3 exists in article1
        const h3 = "main > section > article:nth-child(1) > h3";
        if (this.elementExists(h3)) return wrong(this.missingElementMsg(h3));

        // check if h3 has text
        if (this.elementHasText(h3)) return wrong(this.missingTextMsg(h3));

        // check if i exists in article1
        const i = "main > section > article:nth-child(1) > i";
        if (this.elementExists(i)) return wrong(this.missingElementMsg(i));

        // check if i has text
        if (this.elementHasText(i)) return wrong(this.missingTextMsg(i));

        // check if p exists in article1
        const p = "main > section > article:nth-child(1) > p";
        if (this.elementExists(p)) return wrong(this.missingElementMsg(p));

        // check if p has text
        if (this.elementHasText(p)) return wrong(this.missingTextMsg(p));

        // check if article1 has code tag
        const code = "main > section > article:nth-child(1) > p > code";
        if (this.elementExists(code)) return wrong(this.missingElementMsg(code));

        // check if code has text
        if (this.elementHasText(code)) return wrong(this.missingTextMsg(code));

        // check if article1 has video
        const video = "main > section > article:nth-child(1) > video";
        if (this.elementExists(video)) return wrong(this.missingElementMsg(video));

        // check if video has src
        if (this.elementHasAttribute(video, "src")) return wrong(this.missingAttributeMsg(video, "src"));

        // check if video has controls
        if (this.elementHasAttribute(video, "controls")) return wrong(this.missingAttributeMsg(video, "controls"));

        // check if article2 exists in section
        const article2 = "main > section > article:nth-child(2)";
        if (this.elementExists(article2)) return wrong(this.missingElementMsg(article2));

        // check if h3 exists in article2
        const h3_2 = "main > section > article:nth-child(2) > h3";
        if (this.elementExists(h3_2)) return wrong(this.missingElementMsg(h3_2));

        // check if h3 has text
        if (this.elementHasText(h3_2)) return wrong(this.missingTextMsg(h3_2));

        // check if i exists in article2
        const i_2 = "main > section > article:nth-child(2) > i";
        if (this.elementExists(i_2)) return wrong(this.missingElementMsg(i_2));

        // check if i has text
        if (this.elementHasText(i_2)) return wrong(this.missingTextMsg(i_2));

        // check if p exists in article2
        const p_2 = "main > section > article:nth-child(2) > p";
        if (this.elementExists(p_2)) return wrong(this.missingElementMsg(p_2));

        // check if p has text
        if (this.elementHasText(p_2)) return wrong(this.missingTextMsg(p_2));

        // check if article2 has blockquote tag
        const blockquote = "main > section > article:nth-child(2) > blockquote";
        if (this.elementExists(blockquote)) return wrong(this.missingElementMsg(blockquote));

        // check if blockquote has q tag
        const q = "main > section > article:nth-child(2) > blockquote > q";
        if (this.elementExists(q)) return wrong(this.missingElementMsg(q));

        // check if q has text
        if (this.elementHasText(q)) return wrong(this.missingTextMsg(q));

        // check if article2 has audio
        const audio = "main > section > article:nth-child(2) > audio";
        if (this.elementExists(audio)) return wrong(this.missingElementMsg(audio));

        // check if audio has src
        if (this.elementHasAttribute(audio, "src")) return wrong(this.missingAttributeMsg(audio, "src"));

        // check if audio has controls
        if (this.elementHasAttribute(audio, "controls")) return wrong(this.missingAttributeMsg(audio, "controls"));

        return correct();
    }),
        this.page.execute(() => {
            // test #5
            // FOOTER TAGS

            // check if footer exists
            if (this.elementExists("footer")) return wrong(this.missingElementMsg("footer"));

            // check if footer after main
            const footer = "main ~ footer";
            if (this.elementExists(footer)) return wrong(this.wrongElementOrderMsg("footer", "main"));

            // check if h2 exists in footer
            const h2 = "footer > h2";
            if (this.elementExists(h2)) return wrong(this.missingElementMsg(h2));

            // check if h2 has text
            if (this.elementHasText(h2)) return wrong(this.missingTextMsg(h2));

            // check if a exists in footer
            const link = "footer > a";
            if (this.elementExists(link)) return wrong(this.missingElementMsg(link));

            // check if a has text
            if (this.elementHasText(link)) return wrong(this.missingTextMsg(link));

            // check if a has href
            if (this.elementHasAttribute(link, "href"))
                return wrong(this.missingAttributeMsg(link, "href"));

            // check if address exists in footer
            const address = "footer > address";
            if (this.elementExists(address)) return wrong(this.missingElementMsg(address));

            // check if address has text
            if (this.elementHasText(address)) return wrong(this.missingTextMsg(address));

            // check if p exists in footer
            const p = "footer > p";
            if (this.elementExists(p)) return wrong(this.missingElementMsg(p));

            // check if p has text
            if (this.elementHasText(p)) return wrong(this.missingTextMsg(p));

            return correct();
        })
    ]
}

it("Test stage", async () => {
    await new Test().runTests()
}).timeout(30000);