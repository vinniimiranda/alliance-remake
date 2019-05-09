module.exports = {
    tableData: [
        {
          id: 1,
          selected: false,
          exam: "ULTRASSOM",
          status: "FINALIZADO"
        },
        {
          id: 2,
          selected: false,
          exam: "TOMOGRAFIA",
          status: "À LAUDAR"
        },
        {
          id: 3,
          selected: false,
          exam: "ROTINA",
          status: "AGENDADO"
        }
      ],
      columns: [
        {
          name: "association",
          required: true,
          label: "Associar",
          align: "left",
          field: "id",
          sortable: true,
          classes: "my-class",
          style: "width: 500px"
        },
        {
          name: "exam",
          required: true,
          label: "Exame",
          align: "left",
          field: "exam",
          sortable: true,
          classes: "my-class",
          style: "width: 500px"
        },
        {
          name: "status",
          required: true,
          label: "Status",
          align: "left",
          field: "status",
          sortable: true,
          classes: "my-class",
          style: "width: 500px"
        },
        {
          name: "vincular",
          required: true,
          label: "Vincular",
          align: "left",
          sortable: true,
          classes: "my-class",
          style: "width: 500px"
        },
        {
          name: "report",
          required: true,
          label: "Relatório",
          align: "left",
          sortable: true,
          classes: "my-class",
          style: "width: 500px"
        },
        {
          name: "images",
          required: true,
          label: "Imagens",
          align: "left",
          sortable: true,
          classes: "my-class",
          style: "width: 500px"
        },
        {
          name: "open",
          required: true,
          label: "Abrir",
          align: "left",
          sortable: true,
          classes: "my-class",
          style: "width: 500px"
        }
      ],
}
