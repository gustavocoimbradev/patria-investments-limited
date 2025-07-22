document.addEventListener('DOMContentLoaded', () => {

    let table = new DataTable('#filings-table', {
        pageLength: 10,
        searching: true,
        columns: [
            { orderable: true },
            { orderable: true },
            { orderable: true },
            { orderable: false },
            { orderable: false }
        ]
    });

    document.querySelector(`select[name='items-per-page']`).addEventListener('change', function () {
        table.page.len(parseInt(this.value)).draw();
      });

    let currentGroup = '';
    let currentYear = '';
    
    function updateSearch() {
      const searchInput = document.querySelector('#dt-search-0');
      searchInput.value = [currentGroup, currentYear].filter(Boolean).join(' ');
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    document.querySelector(`select[name='group']`).addEventListener('change', function () {
      currentGroup = this.value;
      updateSearch();
    });
    
    document.querySelector(`select[name='filing-year']`).addEventListener('change', function () {
      currentYear = this.value;
      updateSearch();
    });

});
