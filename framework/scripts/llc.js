jQuery(document).ready(function(){
  // Adds "edit me" note to editable code areas
  jQuery(".snippet").before("<span class=\"edit\">edit me</span>");

  // Add class to resource section
  jQuery( "h3:contains('Resources'), h3:contains('Resource'), h3:contains('Pro tip!')" ).addClass("resources");

  // Generate the Table of Contents
  var ToC = "<ul>";
  var newLine, el, title, link;

  jQuery("[data-toc] > h1").each(function() {
    el = jQuery(this);
    title = el.text();
    link = "#" + el.parent().attr("id");

    newLine =
      "<li>" +
        "<a href='" + link + "'>" +
          title +
        "</a>" +
      "</li>";

    ToC += newLine;
  });
  ToC +="</ul>";
  jQuery(".table-of-contents").append(ToC);

});

(() => {
  class Dropdown {
    constructor(btn, i) {
      // Settings
      this.isVisible = false;
      this.index = i;

      // Objects
      this.dropdownBtn = btn;
      this.dropdownContainer = btn.parentElement;
      this.dropdownContent = btn.nextElementSibling;

      // A11y setup
      this.dropdownContent.id = `dropdown-${this.index}`;
      this.dropdownBtn.setAttribute("aria-expanded", false);
      this.dropdownBtn.setAttribute("aria-controls", this.dropdownContent.id);

      // Event listeners
      this.dropdownBtn.addEventListener(
        "click",
        this.toggleDropdown.bind(this),
        false
      );
      document.addEventListener("keydown", this.escKey.bind(this), false);
      document.addEventListener("click", this.documentClick.bind(this), false);
    }

    // Show dropdown
    showDropdown() {
      this.dropdownContent.style.display = "block";
      this.dropdownBtn.setAttribute("aria-expanded", true);
      this.isVisible = true;
    }

    // Hide dropdown
    hideDropdown() {
      this.dropdownContent.removeAttribute("style");
      this.dropdownBtn.setAttribute("aria-expanded", false);
      this.isVisible = false;
    }

    // Toggle dropdown
    toggleDropdown() {
      this.dropdownContent.style.display === "block"
        ? this.hideDropdown()
        : this.showDropdown();
    }

    // Esc keypress
    escKey(e) {
      if (this.isVisible === true && e.keyCode === 27) {
        this.hideDropdown();
        this.dropdownBtn.focus();
      }
    }

    // Document mouse click
    documentClick(e) {
      if (this.isVisible === true && e.target !== this.dropdownBtn) {
        this.hideDropdown();
      }
    }
  }

  // Find all Dropdown controls
  const dropBtn = document.querySelectorAll(".dropbtn");
  let i = 0;

  // Create new class instance for each
  for (const btn of dropBtn) {
    new Dropdown(btn, i);
    i++;
  }
})();
