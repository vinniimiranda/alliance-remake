<template>
  <div class="row home">
    <q-page>
      <q-table
        grid
        :data="tableData"
        :columns="columns"
        row-key="name"
        :filter="filter"
        :loading="loading"
        loading-label="Carregando dados"
        rows-per-page-label="Resultados por página"
        no-results-label="Nenhum resultado encontrado"
        no-data-label="Sem dados para mostrar"
        align="justify"
      >
        <template slot="top-left">
          <q-search hide-underline v-model="filter" placeholder="Digite sua pesquisa"/>
        </template>
        <template slot="body" slot-scope="props">
          <q-tr :props="props" @dblclick.native="openDetail(props.row.id)">
            <q-td key="desc" :props="props">
              <q-checkbox
                color="info"
                v-model="props.expand"
                checked-icon="keyboard_arrow_up"
                unchecked-icon="keyboard_arrow_down"
                class="q-mr-md"
                @click.native="linha($event)"
              />
            </q-td>
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="paciente" :props="props">{{ props.row.name }}</q-td>
            <q-td key="sexo" :props="props">{{ props.row.gender }}</q-td>
            <q-td key="nascimento" :props="props">{{ props.row.birth }}</q-td>
            <q-td key="origem" :props="props">{{ props.row.origin }}</q-td>
            <q-td key="descricao" :props="props">{{ props.row.description }}</q-td>
            <q-td key="mod" :props="props">{{ props.row.mod }}</q-td>
            <q-td key="dataExame" :props="props">{{ props.row.date }}</q-td>
            <q-td key="status" :props="props">{{ props.row.status }}</q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="row gutter-sm">
                <div class="col-6">
                  <q-card color="secondary">
                    <q-card-separator/>
                    <q-card-main>
                      <div class="row">
                        <div class="col-12">
                          <q-input
                            :value="props.row.id + ' - ' + props.row.name "
                            stack-label="Paciente"
                            :before="[{icon: 'person', handler () {}}]"
                            readonly
                            dark
                          />
                        </div>
                        <div class="col-12">
                          <q-input
                            :value="props.row.convenio"
                            stack-label="Convênio"
                            :before="[{icon: 'business', handler () {}}]"
                            readonly
                            dark
                          />
                        </div>
                        <div class="col-6">
                          <q-input
                            :value="props.row.origin"
                            stack-label="Origem"
                            :before="[{icon: 'local_hospital', handler () {}}]"
                            readonly
                            dark
                          />
                        </div>
                        <div class="col-6">
                          <q-input
                            :value="props.row.study"
                            stack-label="Estudo"
                            :before="[{icon: 'settings', handler () {}}]"
                            readonly
                            dark
                          />
                        </div>
                        <div class="col-3">
                          <q-input
                            :value="props.row.exam"
                            stack-label="Exame"
                            :before="[{icon: 'assignment', handler () {}}]"
                            readonly
                            dark
                          />
                        </div>
                        <div class="col-3">
                          <q-input
                            :value="props.row.series"
                            stack-label="Séries"
                            :before="[{icon: 'image', handler () {}}]"
                            readonly
                            dark
                          />
                        </div>
                        <div class="col-3">
                          <q-input
                            :value="props.row.images"
                            stack-label="Imagens"
                            :before="[{icon: 'image', handler () {}}]"
                            readonly
                            dark
                          />
                        </div>
                        <div class="col-3">
                          <q-input
                            :value="props.row.attachments"
                            stack-label="Anexos"
                            :before="[{icon: 'attach_file', handler () {}}]"
                            readonly
                            dark
                          />
                        </div>
                      </div>
                    </q-card-main>
                  </q-card>
                </div>
                <div class="col-6">
                  <q-card color="secondary">
                    <q-card-separator/>
                    <q-card-main>
                      <div class="row">
                        <div class="col-12">
                          <q-input
                            value="NÃO INFORMADO"
                            stack-label="Solicitado por"
                            :before="[{icon: 'person_pin', handler () {}}]"
                            readonly
                            dark
                          />
                        </div>
                        <div class="col-6">
                          <q-input
                            value="NÃO INFORMADO"
                            stack-label="Executado por"
                            :before="[{icon: 'edit', handler () { detalhe('chama modal médico') }}]"
                            readonly
                            dark
                          >
                            <q-tooltip>Some tooltip</q-tooltip>
                          </q-input>
                        </div>
                        <div class="col-6">
                          <q-input
                            value="NÃO INFORMADO"
                            stack-label="Estação de Trabalho"
                            :before="[{icon: 'edit', handler () {
                          detalhe('chama modal estação')
                        }}]"
                            readonly
                            dark
                          />
                        </div>
                        <div class="col-12">
                          <q-input
                            value="NÃO INFORMADO"
                            stack-label="Laudado por"
                            :before="[{icon: 'person_pin', handler () {}}]"
                            readonly
                            dark
                          />
                        </div>

                        <div class="col-12">
                          <q-input
                            value="NÃO INFORMADO"
                            stack-label="Revisado por"
                            :before="[{icon: 'person_pin', handler () {}}]"
                            readonly
                            dark
                          />
                        </div>
                      </div>
                    </q-card-main>
                  </q-card>
                </div>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-page>
  </div>
</template>

<style></style>

<script>
export default {
  name: "PageHome",
  data: () => ({
    filter: "",
    loading: true,
    columns: [
      {
        name: "desc",
        required: true,
        label: "",
        align: "left"
      },
      {
        name: "id",
        required: true,
        label: "Identificação",
        align: "left",
        field: "id",
        sortable: true,
        classes: "my-class",
        style: "width: 500px"
      },
      {
        name: "paciente",
        required: true,
        label: "Paciente",
        align: "left",
        field: "name",
        sortable: true,
        classes: "my-class",
        style: "width: 500px"
      },
      {
        name: "sexo",
        required: true,
        label: "Sexo",
        align: "left",
        field: "gender",
        sortable: true,
        classes: "my-class",
        style: "width: 500px"
      },
      {
        name: "nascimento",
        required: true,
        label: "Nascimento",
        align: "left",
        field: "birth",
        sortable: true,
        classes: "my-class",
        style: "width: 500px"
      },
      {
        name: "origem",
        required: true,
        label: "Origem",
        align: "left",
        field: "origin",
        sortable: true,
        classes: "my-class",
        style: "width: 500px"
      },
      {
        name: "descricao",
        required: true,
        label: "Descrição do Exame",
        align: "left",
        field: "description",
        sortable: true,
        classes: "my-class",
        style: "width: 500px"
      },
      {
        name: "mod",
        required: true,
        label: "Mod.",
        align: "left",
        field: "mod",
        sortable: true,
        classes: "my-class",
        style: "width: 500px"
      },
      {
        name: "dataExame",
        required: true,
        label: "Data do Exame",
        align: "left",
        field: "date",
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
      }
    ],
    tableData: []
  }),
  methods: {
    detalhe(msg) {
      alert(msg);
    },
    linha(event) {
      let tr = event.path[4];

      if (tr.className.includes("selectedRow ")) {
        tr.className -= " selectedRow ";
      } else {
        tr.className += " selectedRow ";
      }
    },

    openDetail(rowId) {
      this.$router.push(`/exame/${rowId}`);
    },
    fillTable() {
      setTimeout(() => {
        this.tableData.push(
          {
            id: 154512,
            name: "Fulano",
            date: new Date(),
            convenio: "ALLIANZ",
            gender: "M",
            birth: "18/03/1973",
            origin: "DASA - DASA",
            description: "ULTRASSOM",
            mod: "US",
            study: 4445557426,
            exam: "48758",
            series: "1",
            images: "3",
            attachments: "4",
            status: "AGENDADO"
          },
          {
            id: 1554848,
            name: "Ciclano",
            date: new Date(),
            convenio: "ALLIANZ",
            gender: "M",
            birth: "18/03/1973",
            origin: "FLEURY",
            description: "ULTRASSOM",
            mod: "US",
            study: 4445557426,
            exam: "48758",
            series: "1",
            images: "9",
            attachments: "4",
            status: "AGENDADO"
          },
          {
            id: 875662,
            name: "Something 2",
            date: new Date(),
            convenio: "ALLIANZ",
            gender: "M",
            birth: "18/03/1973",
            origin: "DASA - DASA",
            description: "ULTRASSOM",
            mod: "US",
            study: 4445557426,
            exam: "48758",
            series: "898664",
            images: "55544",
            attachments: "4",
            status: "AGENDADO"
          },
          {
            id: 457411,
            name: "Something else",
            date: new Date(),
            convenio: "ALLIANZ",
            gender: "M",
            birth: "18/03/1973",
            origin: "DASA - DASA",
            description: "ULTRASSOM",
            mod: "US",
            study: 4445557426,
            exam: "48758",
            series: "2",
            images: "10",
            attachments: "4",
            status: "AGENDADO"
          }
        );
        this.loading = false;
      }, 1000);
    }
  },
  beforeMount() {
    this.fillTable();
  }
};
</script>
<style >
</style>

<style lang="scss" >
.selectedRow {
  background-color: #26a69a !important;
  color: #ffffff !important;
  font-weight: bold !important;

  .q-checkbox-icon {
    color: #ffffff !important;
  }
}
.home {
  .q-if-label,
  .q-if-addon,
  .q-if-control {
    color: #fff;
    line-height: 24px;
  }
}
</style>
