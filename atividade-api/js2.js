async function main() {
      const resp = await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries');
      const dados = (await resp.json()).data;

      const tbody = document.querySelector('#tabela-paises tbody');

      let somaCasos = 0;
      let somaMortes = 0;
      let totalPaises = 0;

      dados.forEach(p => {
        if (!p.country || isNaN(p.cases) || isNaN(p.deaths)) return;

        totalPaises++;
        somaCasos += p.confirmed;
        somaMortes += p.deaths;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.country}</td>
          <td>${p.confirmed}</td>
          <td>${p.deaths}</td>
        `;
        if (p.country.toLowerCase() === 'brazil' || p.country.toLowerCase() === 'brasil') {
          tr.classList.add('destaque');
        }
        tbody.appendChild(tr);
      });

      const mediaCasos = somaCasos / totalPaises;
      const mediaMortes = somaMortes / totalPaises;

      document.getElementById('media-casos').textContent = mediaCasos.toFixed(1);
      document.getElementById('media-mortes').textContent = mediaMortes.toFixed(1);
    }

    main();
