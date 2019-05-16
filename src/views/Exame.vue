<template>
  <div class="row gutter-sm">
    <div
      id="patient"
      class="animated col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
    >
      <q-card  class="shadow-2" :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }">
        <q-card-title>
          <span class="float-right q-mx-xs">
                <q-btn
              round
              color="white"
              @click.native="expand('patient', 'viewer')"
            >
              <q-icon
                size="2rem"
                :color="color"
                :dark="dark"
                class="cursor-pointer"
                name="fullscreen"
              />
              <q-tooltip
                :class="'bg-white text-' + color"
                anchor="top left"
                
                >Tela toda
              </q-tooltip>
            </q-btn>
          </span>
          <span class="float-right q-mx-xs">
            <q-btn round color="white">
              <q-icon
                size="2rem"
                :color="color"
                class="cursor-pointer"
                name="layers"
              />
              <q-tooltip
                :class="'bg-white text-' + color"
                anchor="top left"
                self="bottom left"
                >Templates</q-tooltip
              >
            </q-btn>
          </span>
          <router-link :to="{ name: 'home' }">
            <span class="float-right q-mx-xs">
              <q-btn round color="white">
                <q-icon
                  name="arrow_back"
                  :color="color"
                  :dark="dark"
                  size="2rem"
                  class="cursor-pointer"
                />
                <q-tooltip
                :class="'bg-white text-' + color"
                anchor="top left"
                self="bottom left"
                >Exames</q-tooltip
              >
              </q-btn>
            </span>
          </router-link>
        </q-card-title>
        <q-card-main  >
         
          <q-tabs
            animated
            swipeable
            :color="color"
            :dark="dark"
            class="shadow-2"
            :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }"
            :glossy="glossy"
            align="justify"
          >
                <q-tab
              default
              name="patient"
              slot="title"
              icon="person"
              label="Paciente"
            />
            
            <q-tab-pane name="patient">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <q-input
                    :dark="dark"
                    :value="exam.patientid + ' - ' + exam.patientname"
                    stack-label="Paciente"
                    :before="[{ icon: 'person', handler() {} }]"
                    readonly
                  />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <q-input
                    :dark="dark"
                    :value="exam.studydescription"
                    stack-label="Exame"
                    :before="[{ icon: 'assignment', handler() {} }]"
                    readonly
                    class="text-primary"
                  />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <q-input
                    :value="
                      dateFormatter(exam.patientbirthdate) +
                        ' - ' +
                        exam.patientage +
                        ' anos'
                    "
                    :color="color"
                    :dark="dark"
                    stack-label="Nascimento"
                    :before="[{ icon: 'event', handler() {} }]"
                    readonly
                  />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <q-input
                    :color="color"
                    :dark="dark"
                    :value="exam.accessionnumber"
                    stack-label="Identificação"
                    :before="[{ icon: 'local_hospital', handler() {} }]"
                    readonly
                  />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <q-input
                    :color="color"
                    :dark="dark"
                    :value="exam.patientsex"
                    stack-label="Sexo"
                    :before="[{ icon: 'perm_contact_calendar', handler() {} }]"
                    readonly
                  />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <q-input
                    :color="color"
                    :dark="dark"
                    :value="dateFormatter(exam.studydate)"
                    stack-label="Data do Estudo"
                    :before="[{ icon: 'date_range', handler() {} }]"
                    readonly
                  />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <q-input
                    :color="color"
                    :dark="dark"
                    :value="exam.perfphyfullname || 'NÃO INFORMADO'"
                    stack-label="Executado por"
                    :before="[{ icon: 'wc', handler() {} }]"
                    readonly
                  />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <q-input
                    :color="color"
                    :dark="dark"
                    :value="exam.workstationname || 'NÃO INFORMADO'"
                    stack-label="Origem"
                    :before="[{ icon: 'business', handler() {} }]"
                    readonly
                  />
                </div>
              </div>
            </q-tab-pane>
          </q-tabs>
          <br />
          <q-tabs
            class="shadow-2"
            animated
            swipeable
            :color="color"
            :dark="dark"
            :glossy="glossy"
            align="justify"
            :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }"
          >
            <q-tab
              
              name="todayExams"
              slot="title"
              label="Exames do dia"
            />
            <q-tab name="history" slot="title" label="Histórico de Laudos" />
            <q-tab
              default
              name="historyExam"
              slot="title"
              label="Histórico de Exames"
            />
            <q-tab-pane name="todayExams">
              <q-table
                :color="color"
                :dark="dark"
                :data="tableData"
                :columns="columns"
                row-key="id"
                :filter="filter"
                :loading="loadingTable"
                selection="multiple"
                :selected.sync="selected"
                loading-label="Carregando dados"
                rows-per-page-label="Resultados por página"
                no-results-label="Nenhum resultado encontrado"
                no-data-label="Sem dados para mostrar"
                align="justify"
              >
                <template slot="top-left">
                  <q-search
                    hide-underline
                    v-model="filter"
                    :color="color"
                    :dark="dark"
                    placeholder="Digite sua pesquisa"
                  />
                </template>
                <template slot="body" slot-scope="props">
                  <q-tr :props="props">
                    <q-td key="association">
                      <q-checkbox
                        :color="color"
                        :dark="dark"
                        v-model="props.selected" 
                      ></q-checkbox>
                    </q-td>

                    <q-td key="exam" :props="props">{{ props.row.exam }}</q-td>
                    <q-td key="status" :props="props">{{
                      props.row.status
                    }}</q-td>
                    <q-td key="vincular" :props="props">
                      <q-icon
                        name="subdirectory_arrow_right"
                        :color="color"
                        :dark="dark"
                        class="cursor-pointer"
                        size="2rem"
                      />
                    </q-td>
                    <q-td key="report" :props="props">
                      <q-icon
                        name="print"
                        :color="color"
                        :dark="dark"
                        class="cursor-pointer"
                        size="2rem"
                      />
                    </q-td>
                    <q-td key="images" :props="props">
                      <q-icon
                        name="images"
                        :color="color"
                        :dark="dark"
                        class="cursor-pointer"
                        size="2rem"
                      />
                    </q-td>
                    <q-td key="open" :props="props">
                      <q-icon
                        name="open_in_new"
                        :color="color"
                        :dark="dark"
                        class="cursor-pointer"
                        size="2rem"
                      />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-tab-pane>
            <q-tab-pane name="history">
              <q-table
                :color="color"
                :dark="dark"
                :data="tableDataReports"
                :columns="columnsReports"
                row-key="id"
                :filter="filterReports"
                :loading="loadingTable"
                selection="single"
                loading-label="Carregando dados"
                rows-per-page-label="Resultados por página"
                no-results-label="Nenhum resultado encontrado"
                no-data-label="Sem dados para mostrar"
                align="justify"
              >
                <template slot="top-left">
                  <q-search
                    hide-underline
                    v-model="filterReports"
                    :color="color"
                    :dark="dark"
                    placeholder="Digite sua pesquisa"
                  />
                </template>

                <template slot="body" slot-scope="props">
                  <q-tr :props="props">
                    <q-td></q-td>
                    <q-td auto-width key="readphyfullname">{{ props.row.readphyfullname }}</q-td>
                    <q-td key="creationdate">{{ dateFormatter(props.row.creationdate) }}</q-td>
                    <q-td key="username">{{ props.row.username }}</q-td>
                    <q-td key="status"><q-icon class="cursor-pointer" size="2rem" :color="color" name="check" /></q-td>
                    <q-td key="update"><q-icon class="cursor-pointer" size="2rem" :color="color" name="edit" /></q-td>
                    
                  </q-tr>
                </template>
              </q-table>
            </q-tab-pane>
            <q-tab-pane name="historyExam">
              <q-table
                :color="color"
                :dark="dark"
                :data="tableDataHistoryExams"
                :columns="columnsHistoryExams"
                row-key="id"
                :filter="filterReports"
                :loading="loadingTable"
                selection="single"
                loading-label="Carregando dados"
                rows-per-page-label="Resultados por página"
                no-results-label="Nenhum resultado encontrado"
                no-data-label="Sem dados para mostrar"
                align="justify"
              >
                <template slot="top-left">
                  <q-search
                    hide-underline
                    v-model="filterReports"
                    :color="color"
                    :dark="dark"
                    placeholder="Digite sua pesquisa"
                  />
                </template>

                <template slot="body" slot-scope="props">
                  <q-tr :props="props">
                    <q-td></q-td>
                    <q-td auto-width key="studydescription">{{ props.row.studydescription }}</q-td>
                    <q-td key="statusname">{{ props.row.statusname }}</q-td>
                    <q-td key="readphyid"><q-icon class="cursor-pointer" size="2rem" :color="color" name="description" /></q-td>
                    <q-td key="status"><q-icon class="cursor-pointer" size="2rem" :color="color" name="check" /></q-td>
                    <q-td key="update"><q-icon class="cursor-pointer" size="2rem" :color="color" name="edit" /></q-td>
                    
                  </q-tr>
                </template>
              </q-table>
            </q-tab-pane>
          </q-tabs>
          <br />
          <q-tabs
            class="shadow-2"
            :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }"
            animated
            swipeable
            :color="color"
            :dark="dark"
            :glossy="glossy"
            align="justify"
          >
            <q-tab
              name="anotations"
              slot="title"
              icon="description"
              label="Anotações"
            />
            <q-tab-pane name="anotations">
              <div class="row">
                <div class="col-12">
                  <q-input
                    type="textarea"
                    rows="3"
                    :color="color"
                    :dark="dark"
                    float-label="Descreva aqui suas anotações"
                    value
                  />
                </div>

                <div class="col-12 q-mt-md" align="right">
                  <q-btn
                    :color="color"
                    :dark="dark"
                    :glossy="glossy"
                    icon="save"
                    label="Salvar"
                    size="lg"
                  />
                </div>
              </div>
            </q-tab-pane>
          </q-tabs>
          <br />
          <q-tabs
            class="shadow-2"
            :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }"
            animated
            swipeable
            :color="color"
            :dark="dark"
            :glossy="glossy"
            align="justify"
          >
            <q-tab
              name="attachments"
              slot="title"
              icon="attach_file"
              label="Anexos"
            />
            <q-tab-pane name="attachments">
              <div class="row">
                <div class="col-12">
                  <q-table
                    :color="color"
                    :dark="dark"
                    :columns="columnsAttachments"
                    :data="tableDataAttachments"
                    row-key="id"
                    loading-label="Carregando dados"
                    rows-per-page-label="Resultados por página"
                    no-results-label="Nenhum resultado encontrado"
                    no-data-label="NENHUM DOCUMENTO FOI ANEXADO AO EXAME"
                  >
                    <template slot="body" slot-scope="props">
                      <q-tr :props="props">
                        <q-td key="type" :props="props">{{
                          props.row.type
                        }}</q-td>
                        <q-td key="user" :props="props">{{
                          props.row.user
                        }}</q-td>
                        <q-td key="date" :props="props">{{
                          dateFormatter(props.row.date)
                        }}</q-td>
                        <q-td key="user" :props="props">
                          <q-icon
                            name="open_in_new"
                            :color="color"
                            :dark="dark"
                            class="cursor-pointer"
                            size="2rem"
                          />
                        </q-td>
                        <q-td>
                          <q-icon
                            name="delete"
                            :color="color"
                            :dark="dark"
                            class="cursor-pointer"
                            size="2rem"
                          />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-lg-6 col-xl-8"></div>
                <div
                  class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 q-mt-md"
                  align="left"
                >
                  <input
                    type="file"
                    id="file"
                    class="hidden"
                    @change="sendFile()"
                  />
                  <q-select
                    :color="color"
                    :dark="dark"
                    float-label="Tipo de Documento"
                    v-model="attachmentType"
                    :options="selectOptionsAttachment"
                    :after="[
                      {
                        icon: 'attach_file',
                        handler() {
                          sendAttachment();
                        }
                      }
                    ]"
                  />
                </div>
              </div>
            </q-tab-pane>
          </q-tabs>
        </q-card-main>
      </q-card>
    </div>
    <div
      id="viewer"
      class="animated col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
      style="height:100%"
    >
      <q-card  style="height:94.5vh"  class="shadow-1 relative-position" :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }">
        <q-card-title :dark="dark" >
           
               <span class="float-right">
             <q-btn
              round
              color="white"
              @click.native="expand('viewer', 'patient')"
            >
              <q-icon
                size="2rem"
                :color="color"
                :dark="dark"
                class="cursor-pointer"
                name="fullscreen"
              />
              <q-tooltip
                :class="'bg-white text-' + color"
                anchor="top left"
                >Tela toda
              </q-tooltip>
            </q-btn>
          </span>
          <div style="height:100%" class="float-left"  :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }">

             <div class="iconViewer">
               <q-btn  size="md" color="white" round >
               <q-icon
                size="2rem"
                :color="color"
                :dark="dark"
                class="cursor-pointer"
                name="person_pin"
              />
              </q-btn></div> 
             <div id="patientInfoViewer"  :class="{ 'text-grey-10': !dark, 'text-white': dark }" > 
              
            {{ exam.patientid }} - {{ exam.patientname }}
            </div>
            <div id="examInfoViewer" :class="{ 'text-grey-10': !dark, 'text-white': dark }">  {{ exam.studydescription }} -AN:{{ exam.accessionnumber }}</div>
            
          </div>
          <!-- Viewer {{ exam.webviewerurl }} -->
         
          
        </q-card-title>
        <q-card-main >
          <iframe :src="exam.webviewerurl" type="text/html" frameborder="0" height="100%" width="100%"></iframe>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>
<script>
import { date } from "quasar";
import {
  columns,
  columnsReports,
  columnsAttachments,
  columnsHistoryExams,
  tableDataAttachments,
  tableData,
  tableDataReports,
  tableDataHistoryExams
} from "./tablesColumns/exame.js";
import * as Home from "./tablesColumns/home.js";

export default {
  methods: {
    expand(divClick, divElse) {
      let line = document.getElementById(`${divClick}`);
      if (
        line.className.includes("col-lg-6") ||
        line.className.includes("col-xl-6")
      ) {
        console.log("tamanho 6");
        $(`#${divClick}`).show();
        $(`#${divClick}`).removeClass("col-lg-6 col-xl-6");
        $(`#${divClick}`).addClass("col-lg-12 col-xl-12");

        $(`#${divElse}`).hide();
        $(`#${divElse}`).addClass("col-lg-6 col-xl-6");
      } else {
        $(`#${divClick}`).show();
        $(`#${divClick}`).removeClass("col-lg-12 col-xl-12");
        $(`#${divClick}`).addClass("col-lg-6 col-xl-6");

        $(`#${divElse}`).show();
        $(`#${divElse}`).removeClass("col-lg-12 col-xl-12");
        $(`#${divElse}`).addClass("col-lg-6 col-xl-6");
      }
    },
    dateFormatter(fullDate) {
      return date.formatDate(fullDate, "DD/MM/YYYY");
    },
    sendAttachment() {
      $("#file").click();
    },
    sendFile() {
      let fileInput = $("#file");
      let fileList = fileInput[0].files;

      let fileListString = fileList[0].name;
      alert(
        `Tipo de Documento: ${this.attachmentType}, arquivo: ${fileListString}`
      );
    },
    checkExams() {
      Home.tableData.filter(examI => {
        if (examI.id == this.id) {
          this.exam = examI;
        }
      });
    }
  },
  computed: {
    color() {
      return this.$store.getters.getColor;
    },
    glossy() {
      return this.$store.getters.getGlossy;
    },
    dark() {
      return this.$store.getters.getDarken;
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      loadingTable: false,
      selected: [],
      attachmentType: "",
      selectOptionsAttachment: [
        {
          label: "Histórico Clínico",
          value: "Histórico Clínico"
        },
        {
          label: "Pedido Médico",
          value: "Pedido Médico"
        },
        {
          label: "Anamnese",
          value: "Anamnese"
        },
        {
          label: "Outros",
          value: "Outros"
        }
      ],
      filter: "",
      filterReports: "",
      columns,
      columnsReports,
      columnsAttachments,
      columnsHistoryExams,
      tableData,
      tableDataAttachments,
      tableDataReports: [],
      tableDataHistoryExams,
      exam: {}
    };
  },

  beforeMount() {
    this.checkExams();
    tableDataReports.filter(report => {
      if(this.exam.reportid == report.id){
        this.tableDataReports.push(report)
      }
      
    })
  }
};
</script>
<style>
.animated {
  /* transition: all 0.05s; */
}
#patientInfoViewer, #examInfoViewer{
  position: relative;
  top: -3rem;
  margin-left: 3.3rem !important;
  

}

#viewer{
  height: 100%;  
}
*{
  /* font-size: 0.91rem; */
}
</style>
