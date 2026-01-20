
/*Data & config*/
const myDates = {
      '2025-12-31':'',
      '2026-02-02': 'hompage complete',
      '2026-02-07': 'Pre-production page complete',
      '2026-04-11': 'production page complete',
      '2026-04-25': 'Game Demo complete',
      '2026-05-31' : ''
    };

//Extract the keys (date string) and convert to Date objects to find range  
    const dateKeys = Object.keys(myDates);
    const minDate = new Date(Math.min(...dateKeys.map(d => new Date(d))));
    const maxDate = new Date(Math.max(...dateKeys.map(d => new Date(d))));
//Global state for the calander 
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
//Boundires for navigation 
    const minMonth = minDate.getMonth();
    const minYear = minDate.getFullYear();
    const maxMonth = maxDate.getMonth();
    const maxYear = maxDate.getFullYear();
/*core render function. rebuilds HTML when month/ changes*/
    function render() {
      const cal = document.getElementById('calendar');
      const monthYear = document.getElementById('monthYear');
      
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      
      monthYear.textContent = new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });

      cal.innerHTML = '';
      
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => {
        const el = document.createElement('div');
        el.className = 'day day-name';
        el.textContent = d;
        cal.appendChild(el);
      });

      for (let i = 0; i < firstDay; i++) {
        const el = document.createElement('div');
        el.className = 'day empty';
        cal.appendChild(el);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const el = document.createElement('div');
        el.className = 'day';
        el.textContent = day;
        
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (myDates[dateStr]) {
          el.classList.add('highlighted');
          const tooltip = document.createElement('div');
          tooltip.className = 'event-tooltip';
          tooltip.textContent = myDates[dateStr];
          el.appendChild(tooltip);
        }
        
        cal.appendChild(el);
      }

      document.getElementById('prev').disabled = 
        currentYear < minYear || (currentYear === minYear && currentMonth <= minMonth);
      document.getElementById('next').disabled = 
        currentYear > maxYear || (currentYear === maxYear && currentMonth >= maxMonth);
    }
/* event litseners*/
    document.getElementById('prev').addEventListener('click', () => {
      if (currentYear > minYear || (currentYear === minYear && currentMonth > minMonth)) {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        render();
      }
    });

    document.getElementById('next').addEventListener('click', () => {
      if (currentYear < maxYear || (currentYear === maxYear && currentMonth < maxMonth)) {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        render();
      }
    });

    render();