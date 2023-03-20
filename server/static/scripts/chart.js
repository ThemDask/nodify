// need to npm i chartjs

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['rock', 'pop', 'techno/electronica', 'classical', 'traditional', 'jazz'],
    datasets: [{
      label: '% of genre',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});