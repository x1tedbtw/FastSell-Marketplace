import { validateToken } from "../auth.js";

class AppHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "styles/components/AppHeader.css");

        
        const inner = document.createElement("div");
        inner.className = "inner"; 

        const inner_logo = document.createElement("div");
        inner_logo.className = "logo";
        const inner_logo_a = document.createElement("a");
        inner_logo_a.href = "/";
        const inner_logo_a_div = document.createElement("div");
        const inner_logo_a_div_img = document.createElement("img");
        inner_logo_a_div_img.src = "media/fastsell_logo.png";
        inner_logo_a_div_img.alt = "FastSell logo";

        const inner_menutoggle = document.createElement("div");
        inner_menutoggle.className = "menu-toggle";
        const inner_menutoggle_div1 = document.createElement("div");
        inner_menutoggle_div1.className = "bar";
        const inner_menutoggle_div2 = document.createElement("div");
        inner_menutoggle_div2.className = "bar";
        const inner_menutoggle_div3 = document.createElement("div");
        inner_menutoggle_div3.className = "bar";

        const inner_nav = document.createElement("nav");

        const inner_nav_li1 = document.createElement("li");
        const inner_nav_li1_span = document.createElement("span");
        const inner_nav_li1_span_a = document.createElement("a");
        inner_nav_li1_span_a.innerHTML = "Login";
        inner_nav_li1_span_a.href = "login.html";
        inner_nav_li1_span_a.className = "button1";

        const inner_nav_li2 = document.createElement("li");
        const inner_nav_li2_span = document.createElement("span");
        const inner_nav_li2_span_a = document.createElement("a");
        inner_nav_li2_span_a.innerHTML = "Register";
        inner_nav_li2_span_a.href = "register.html";
        inner_nav_li2_span_a.classList = "button2"; 


        shadow.appendChild(link);
        shadow.appendChild(inner);

        inner.appendChild(inner_logo);
        inner_logo.appendChild(inner_logo_a);
        inner_logo_a.appendChild(inner_logo_a_div);
        inner_logo_a_div.append(inner_logo_a_div_img);

        inner.appendChild(inner_menutoggle);
        inner_menutoggle.appendChild(inner_menutoggle_div1);
        inner_menutoggle.appendChild(inner_menutoggle_div2);
        inner_menutoggle.appendChild(inner_menutoggle_div3);

        inner.appendChild(inner_nav);

        inner_nav.appendChild(inner_nav_li1);
        inner_nav_li1.appendChild(inner_nav_li1_span);
        inner_nav_li1_span.appendChild(inner_nav_li1_span_a);

        inner_nav.appendChild(inner_nav_li2);
        inner_nav_li2.appendChild(inner_nav_li2_span);
        inner_nav_li2_span.appendChild(inner_nav_li2_span_a);

        this.modifyButtons(inner_nav_li1_span_a, inner_nav_li2_span_a)
    }

    async modifyButtons(button1, button2) {
        const authorized = await validateToken();
        if (authorized) {
            button1.innerHTML = "Create Offer";
            button1.href = "createoffer.html";

            button2.innerHTML = "My Profile";
            button2.href = "myprofile.html";
        }
    }
}

customElements.define("app-header", AppHeader);
