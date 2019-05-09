<template>
  <div class="row">
    <div class="col-6">
      <q-card>
        <q-card-title>
          <span class="float-right">
            <q-icon size="2rem" name="fullscreen"/>
          </span>
          <span class="float-right">
            <q-icon size="2rem" name="layers"/>
          </span>
          <router-link :to="{name: 'home'}">
            <span class="float-right">
              <q-icon name="arrow_back" size="2rem"/>
            </span>
          </router-link>
        </q-card-title>

        <q-card-main>
          <q-tabs class="shadow-1" animated swipeable color="secondary" glossy align="justify">
            <q-tab default name="pacient" slot="title" icon="person" label="Paciente"/>

            <q-tab-pane name="pacient">
              <div class="row">
                <h6>{{ exam.id }} - {{ exam.name }}</h6>
              </div>
              <div class="row">
                <div class="col-6">
                  <q-input
                    color="secondary"
                    :value="exam.id + ' - ' + exam.name "
                    stack-label="Paciente"
                    :before="[{icon: 'person', handler () {}}]"
                    readonly
                  />
                </div>
                <div class="col-6">
                  <q-input
                    :value="exam.description"
                    stack-label="Exame"
                    :before="[{icon: 'assignment', handler () {}}]"
                    readonly
                  />
                </div>
                <div class="col-6">
                  <q-input
                    :value="exam.birth "
                    stack-label="Nascimento"
                    :before="[{icon: 'event', handler () {}}]"
                    readonly
                  />
                </div>
                <div class="col-6">
                  <q-input
                    :value="exam.exam"
                    stack-label="Identificação"
                    :before="[{icon: 'local_hospital', handler () {}}]"
                    readonly
                  />
                </div>
                <div class="col-6">
                  <q-input
                    :value="exam.gender"
                    stack-label="Sexo"
                    :before="[{icon: 'perm_contact_calendar', handler () {}}]"
                    readonly
                  />
                </div>
                <div class="col-6">
                  <q-input
                    :value="exam.date"
                    stack-label="Data do Estudo"
                    :before="[{icon: 'date_range', handler () {}}]"
                    readonly
                  />
                </div>
                <div class="col-6">
                  <q-input
                    value="NÃO INFORMADO"
                    stack-label="Executado por"
                    :before="[{icon: 'wc', handler () {}}]"
                    readonly
                  />
                </div>
                <div class="col-6">
                  <q-input
                    :value="exam.origin"
                    stack-label="Origem"
                    :before="[{icon: 'business', handler () {}}]"
                    readonly
                  />
                </div>
              </div>
            </q-tab-pane>
          </q-tabs>
          <br>
          <br>
          <q-tabs class="shadow-2" animated swipeable color="secondary" glossy align="justify">
            <q-tab default name="todayExams" slot="title" label="Exames do dia"/>
            <q-tab name="history" slot="title" label="Histórico de Laudos"/>
            <q-tab name="historyExam" slot="title" label="Histórico de Exames"/>

            <q-tab-pane name="todayExams">
              <q-table
                loading-label="Carregando dados"
                rows-per-page-label="Resultados por página"
                no-results-label="Nenhum resultado encontrado"
                no-data-label="Sem dados para mostrar"
      
                :data="tableData"
                :columns="columns"
                grid
                :loading="loadingTable"
                :filter="filter"
                
              >
                <template slot="top-right">
                  <q-search
                    color="secondary"
                    hide-underline
                    v-model="filter"
                    placeholder="Pesquisar"
                  />
                </template>
              </q-table>
            </q-tab-pane>
            <q-tab-pane name="history">Tab Five</q-tab-pane>
            <q-tab-pane name="historyExam">Tab Five</q-tab-pane>
          </q-tabs>
        </q-card-main>
      </q-card>
    </div>
    <div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      loadingTable: false,
      tableData: [],
      filter: "",
      columns: [
        {
          name: "association",
          required: true,
          label: "Associar",
          align: "left",
          sortable: true,
          classes: "my-class",
          style: "width: 500px"
        },
        {
          name: "exam",
          required: true,
          label: "Exame",
          align: "left",
          sortable: true,
          classes: "my-class",
          style: "width: 500px"
        },
        {
          name: "status",
          required: true,
          label: "Status",
          align: "left",
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
      exam: {
        id: 1554848,
        name: "Ciclano",
        date: new Date(),
        convenio: "ALLIANZ",
        gender: "MASCULINO",
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
      }
    };
  },
  created() {}
};
</script>
