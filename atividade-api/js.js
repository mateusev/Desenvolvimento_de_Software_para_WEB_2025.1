async function main() {
      const resp = await fetch('https://covid19-brazil-api.vercel.app/api/report/v1').then(r => r.json());
      const estados = resp.data; 

      const tbody = document.querySelector('#tabela-estados tbody');
      let somaCasos = 0; 
      let somaSuspeitos = 0;
      let somaObitos = 0;

      estados.forEach(e => {
        somaCasos += e.cases;
        somaSuspeitos += e.suspects;
        somaObitos += e.deaths;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${e.state}</td>
          <td>${e.uf}</td>
          <td>${e.cases}</td>
          <td>${e.suspects}</td>
          <td>${e.deaths}</td>
        `;
        tbody.appendChild(tr);
      });

      const n = estados.length;
      const mediaCasos = somaCasos / n;
      const mediaSuspeitos = somaSuspeitos / n;
      const mediaObitos = somaObitos / n;

      document.getElementById('media-casos').textContent = mediaCasos.toFixed(1);
      document.getElementById('media-suspeitos').textContent = mediaSuspeitos.toFixed(1);
      document.getElementById('media-obitos').textContent = mediaObitos.toFixed(1);

      
      Array.from(tbody.children).forEach(tr => {
        const obitos = Number(tr.cells[4].textContent);
        if (obitos > mediaObitos) {
          tr.classList.add('destacar');
        }
      });

      
      let maior = {uf: null, ratio: -Infinity};
      let menor = {uf: null, ratio: Infinity};

      estados.forEach(e => {
        if (e.deaths > 0) {
          const r = e.cases / e.deaths;
          if (r > maior.ratio) maior = {uf: e.uf, ratio: r};
          if (r < menor.ratio) menor = {uf: e.uf, ratio: r};
        }
      });

      document.getElementById('maior-ratio').textContent =
        `${maior.uf} (${maior.ratio.toFixed(1)})`;
      document.getElementById('menor-ratio').textContent =
        `${menor.uf} (${menor.ratio.toFixed(1)})`;
    }

    main()
