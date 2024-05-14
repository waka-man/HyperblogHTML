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
            if (!attributeValue) return true;
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
    })]
}

it("Test stage", async () => {
    await new Test().runTests()
}).timeout(30000);