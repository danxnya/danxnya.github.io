document.addEventListener('DOMContentLoaded', function() {
    const width = window.innerWidth;
    const height = 1000;
    const svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height)
        .call(d3.zoom().on("zoom", function (event) {
            svg.attr("transform", event.transform)
        }))
        .append("g");
    const tree = d3.tree().nodeSize([100, 100]); // Ajusta el tamaño de los nodos y la separación entre ellos


    const data = {
      name: "Raíz",
      children: [
        { name: "Hijo 1", id: 1 }, // Asegurándose de que cada nodo tenga un ID único
        {
          name: "Hijo 2",
          children: [
            { 
                name: "Nieto 1",
                children: [
                    {
                        name: 'Subnieto 1', id: 4
                    },
                    {
                        name: 'Subnieto 2', id: 5
                    },
                    {
                        name: 'Subnieto 3', id: 6
                    }
                ]
            },
            { name: "Nieto 2", id: 7 }
          ]
        }
      ]
    };

    let i = 0;
    const root = d3.hierarchy(data);
    const update = () => {
        const nodes = tree(root).descendants();
        const links = tree(root).links();

        const node = svg.selectAll('.node')
            .data(nodes, d => d.id || (d.id = ++i))
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            // Cambios en los colores de los nodos y enlaces cuando se interactúa con ellos
            .on('mouseover', function (event, d) {
                if (d.id !== 1) {
                    d3.select(this).select('circle')
                    .transition()
                    .duration(200)
                    .attr('r', 20)
                    .style('fill', '#c6aae8;') /* Cambiar a un rosa más claro al pasar el ratón */
                    .style('opacity', 1)
                    .ease(d3.easeElasticOut.amplitude(3).period(2));
                }
            })
            .on('mouseout', function (event, d) {
                if (d.id !== 1) {
                    d3.select(this).select('circle')
                    .transition()
                    .duration(200)
                    .attr('r', 10)
                    .style('fill', '#c6aae8;') /* Volver al rosa pastel */
                    .style('opacity', 0.7)
                    .ease(d3.easeElasticOut.amplitude(3).period(2));
                }
            });


        node.append('circle').attr('r', 10);
        node.append('text')
            .attr('dy', '0.35em')
            .attr('x', 13)
            .attr('y', d => d.children ? -20 : 20)
            .text(d => d.data.name)
            .style('text-anchor', 'start')
            .style('font-weight', 'bold')
            .style('fill', '#C5C5C5')
            .style('font-family', 'Font');

        svg.selectAll('.link')
            .data(links, d => d.target.id)
            .enter().insert('path', 'g')
            .attr('class', 'link')
            .attr('d', d3.linkVertical().x(d => d.x).y(d => d.y));

        // Aplicando estilos especiales a los nodos específicos después de crear todos los nodos
        const specificNodes = [1]; // ID del nodo que deseas modificar
        specificNodes.forEach((id) => {
            svg.selectAll(".node")
              .filter((d) => d.id === id)
              .select("circle")
              .style("fill", "#c6aae8") // Cambiar el color de fondo
              .style("stroke-width", 3) // Ajustar el ancho del borde
              .style("stroke", "white") // Cambiar el color del borde
              .style("opacity", 0.9) // Ajustar la opacidad del nodo
              .style("stroke-opacity", 0.7) // Ajustar la opacidad del borde
              .attr("r", 25); // Aumentar el tamaño del círculo
        });
    };

    update();
});
