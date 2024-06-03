function calcularJuros() {
    var valor = document.getElementById("valor").value;
    var entrada = document.getElementById("entrada").value;
    var parcela = document.getElementById("parcela").value;
    var numParcelas = document.getElementById("numParcelas").value;

    if (valor === "" || entrada === "" || parcela === "" || numParcelas === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    valor = parseFloat(valor);
    entrada = parseFloat(entrada);
    parcela = parseFloat(parcela);
    numParcelas = parseInt(numParcelas);

    var valorFinanciado = valor - entrada;

    // Calcular o valor total pago
    var totalPago = (parcela * numParcelas) - entrada;

    // Calcular a taxa de juros efetiva
    var taxa = calcularTaxa(valorFinanciado, parcela, numParcelas);

    document.getElementById("resultado").innerHTML = "<h2>Resultado:</h2>" +
        "<p>Total pago (com juros e desconto da entrada): <strong>R$ " + totalPago.toFixed(2) + "</strong></p>" +
        "<p>Taxa de Juros Efetiva: <strong>" + (taxa * 100).toFixed(2) + "%</strong></p>";
}

function calcularTaxa(principal, parcela, numParcelas) {
    var taxaBaixa = 0;
    var taxaAlta = 1;
    var taxa = 0;

    while (taxaAlta - taxaBaixa > 0.000001) {
        taxa = (taxaBaixa + taxaAlta) / 2;
        var valorCalculado = principal * taxa / (1 - Math.pow(1 + taxa, -numParcelas));

        if (valorCalculado > parcela) {
            taxaAlta = taxa;
        } else {
            taxaBaixa = taxa;
        }
    }

    return taxa;
}

function limparCampos() {
    document.getElementById("valor").value = "";
    document.getElementById("entrada").value = "";
    document.getElementById("parcela").value = "";
    document.getElementById("numParcelas").value = "";
    document.getElementById("resultado").innerHTML = "";
}
