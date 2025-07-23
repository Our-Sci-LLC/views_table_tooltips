(function (Drupal, once) {
  Drupal.behaviors.viewsTableTooltips = {
    attach: function (context) {
      once('views-table-tooltip', '.view .views-table td', context).forEach(cell => {
        // Get the cell content without HTML tags
        const textContent = cell.textContent.trim();

        const hasComplexContent = () => {
          // Case 1: Contains elements other than a single anchor
          if (cell.children.length > 1) return true;

          // Case 2: Contains a single element that's not an anchor
          if (cell.children.length === 1 && cell.firstElementChild.tagName !== 'A') return true;

          // Case 3: Contains an anchor with complex content
          if (cell.firstElementChild?.tagName === 'A' &&
            cell.firstElementChild.children.length > 0) {
            return true;
          }

          return false;
        };

        // Only process plain text or simple anchor cells
        if (!hasComplexContent() && cell.scrollWidth > cell.clientWidth) {
          cell.setAttribute('title', textContent);
        }
      });
    }
  };
})(Drupal, once);
