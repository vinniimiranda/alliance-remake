<template>
  <div class="row">
    <div class="col-12">
      <q-page class="docs-table">
        <q-table
          class="shadow-2"
          :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }"
          :dark="dark"
          :data="tableData"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :loading="loading"
          loading-label="Carregando dados"
          rows-per-page-label="Resultados por página"
          no-results-label="Nenhum resultado encontrado"
          no-data-label="Sem dados para mostrar"
          align="justify"
          :visible-columns="visibleColumns"
          :pagination.sync="pagination"
          :rows-per-page-options="[5, 10, 20, 50, 100, 0]"
        >
          <template slot="top-left">
            <q-search
              hide-underline
              v-model="filter"
              :color="color"
              :dark="dark"
              placeholder="Pesquisar"
            />
          </template>
          <template slot="top-right">
            <q-table-columns
              :color="color"
              :dark="dark"
              class="q-mr-sm"
              v-model="visibleColumns"
              :columns="columns"
              label="Colunas"
            />

            <q-btn
              label="Inverter colunas"
              :color="color"
              @click="changeColumnOrder(null, null, 'none')"
            ></q-btn>
          </template>
          <!-- <q-tr slot="header" slot-scope="props" :props="props" >
            <q-th  v-for="(col, index) in props.cols " :key="col.name" :class="col.__thClass" class="sortable"> 
              <q-btn icon="arrow_left" v-if="col.name != 'desc' && col.name != 'info' " flat round  size="sm" @click="changeColumnOrder(col, props.cols[index-1], 'left')" />
              <span style="font-size:.7rem;">{{ col.label  }} </span>
              <q-btn icon="arrow_right" v-if="col.name != 'desc' && col.name != 'info' " flat round  size="sm" @click="changeColumnOrder(col, props.cols[index+1], 'right') " />
               </q-th>
          </q-tr>-->
          <template slot="body" slot-scope="props">
            <q-tr
              :props="props"
              @dblclick.native="openStudyDetail(props.row)"
              class="cursor-pointer"
            >
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <q-checkbox
                  v-if="col.name== 'desc'"
                  :color="color"
                  v-model="props.expand"
                  checked-icon="keyboard_arrow_up"
                  unchecked-icon="keyboard_arrow_down"
                  class="q-mr-md hide-on-med-and-down"
                  @click.native="fillEmptyInput(props.row)"
                />
                <q-btn
                  v-else-if="col.name== 'info'"
                  flat
                  class="mobile-only"
                  round
                  :color="color"
                  icon="open_in_new"
                  auto-width
                  @click="openStudyDetail(props.row)"
                />
                <span
                  v-else-if="col.name== 'nascimento' || col.name== 'dataExame' "
                >{{ dateFormatter(col.value) }}</span>
                <span v-else>{{ col.value }}</span>
              </q-td>
            </q-tr>

            <q-tr v-show="props.expand" :props="props" class="home">
              <q-td colspan="100%">
                <div class="row gutter-sm">
                  <div class="col-6">
                    <q-card :color="color">
                      <q-card-separator/>
                      <q-card-main>
                        <div class="row">
                          <div class="col-12">
                            <q-input
                              :value="
                                props.row.patientid +
                                  ' - ' +
                                  props.row.patientname
                              "
                              stack-label="Paciente"
                              :before="[{ icon: 'person', handler() {} }]"
                              readonly
                              dark
                            />
                          </div>
                          <div class="col-12">
                            <q-input
                              :value="props.row.insurancename"
                              stack-label="Convênio"
                              :before="[{ icon: 'business', handler() {} }]"
                              readonly
                              dark
                            />
                          </div>
                          <div class="col-3">
                            <q-input
                              :value="props.row.sitename"
                              stack-label="Origem"
                              :before="[
                                { icon: 'local_hospital', handler() {} }
                              ]"
                              readonly
                              dark
                            />
                          </div>
                          <div class="col-9">
                            <q-input
                              :value="props.row.studyinstanceuid"
                              stack-label="Estudo"
                              :before="[{ icon: 'settings', handler() {} }]"
                              readonly
                              dark
                            />
                          </div>
                          <div class="col-3">
                            <q-input
                              :value="props.row.accessionnumber"
                              stack-label="Exame"
                              :before="[{ icon: 'assignment', handler() {} }]"
                              readonly
                              dark
                            />
                          </div>
                          <div class="col-3">
                            <q-input
                              :value="props.row.totalseries"
                              stack-label="Séries"
                              :before="[{ icon: 'image', handler() {} }]"
                              readonly
                              dark
                            />
                          </div>
                          <div class="col-3">
                            <q-input
                              :value="props.row.totalimages"
                              stack-label="Imagens"
                              :before="[{ icon: 'image', handler() {} }]"
                              readonly
                              dark
                            />
                          </div>
                          <div class="col-3">
                            <q-input
                              :value="props.row.attachments"
                              stack-label="Anexos"
                              :before="[{ icon: 'attach_file', handler() {} }]"
                              readonly
                              dark
                            />
                          </div>
                        </div>
                      </q-card-main>
                    </q-card>
                  </div>
                  <div class="col-6">
                    <q-card :color="color">
                      <q-card-separator/>
                      <q-card-main>
                        <div class="row">
                          <div class="col-12">
                            <q-input
                              value="NÃO INFORMADO"
                              stack-label="Solicitado por"
                              :before="[{ icon: 'person_pin' }]"
                              readonly
                              dark
                            />
                          </div>
                          <div class="col-6">
                            <q-input
                              stack-label="Executado por"
                              v-model="props.row.perfphyfullname"
                              :before="[
                                {
                                  icon: 'edit',
                                  handler() {
                                    perfphyPosition = props.row;
                                    doctorModal = true;
                                  }
                                }
                              ]"
                              readonly
                              dark
                            >
                              <q-tooltip
                                :class="'bg-white text-' + color"
                                anchor="top left"
                                self="bottom left"
                              >Associar Médico</q-tooltip>
                            </q-input>
                          </div>
                          <div class="col-6">
                            <q-input
                              v-model="props.row.workstationname"
                              stack-label="Estação de Trabalho"
                              :before="[
                                {
                                  icon: 'edit',
                                  handler() {
                                    workStationModal = true;
                                    workStationPosition = props.row;
                                  }
                                }
                              ]"
                              readonly
                              dark
                            >
                              <q-tooltip
                                :class="'bg-white text-' + color"
                                anchor="top left"
                                self="bottom left"
                              >Associar Estação de Trabalho</q-tooltip>
                            </q-input>
                          </div>
                          <div class="col-12">
                            <q-input
                              :value="
                                props.row.readphyfullname || 'NÃO INFORMADO'
                              "
                              stack-label="Laudado por"
                              :before="[{ icon: 'person_pin', handler() {} }]"
                              readonly
                              dark
                            />
                          </div>

                          <div class="col-12">
                            <q-input
                              value="NÃO INFORMADO"
                              stack-label="Revisado por"
                              :before="[{ icon: 'person_pin', handler() {} }]"
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
        <q-modal
          position="top"
          :content-css="{ minWidth: '30vw', minHeight: '50vh' }"
          class="q-mt-xl"
          v-model="doctorModal"
        >
          <q-modal-layout :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }">
            <q-toolbar class="no-shadow" :text-color="color" color="none" slot="header">
              <q-toolbar-title :class="{ 'text-grey-10': !dark, 'text-white': dark }">
                <div class="row">
                  <div class="col-11 q-py-sm">Médico Responsável</div>
                  <div class="col-1 q-pl-md">
                    <q-btn
                      round
                      flat
                      dense
                      size="md"
                      :color="color"
                      icon="close"
                      @click="doctorModal = false"
                    />
                  </div>
                </div>
              </q-toolbar-title>
            </q-toolbar>

            <q-toolbar class="no-shadow" text-color="primary" color="none" slot="footer">
              <q-toolbar-title class="no-shadow">
                <div class="row justify-center">
                  <q-btn
                    class="q-mr-md"
                    size="md"
                    :color="color"
                    @click="
                      (perfphyPoistion = props.row), (doctorModal = false)
                    "
                    :dark="dark"
                    label="Cancelar"
                  />
                  <q-btn
                    dense
                    :color="color"
                    size="md"
                    style="width:20%;"
                    @click="doctorModal = false"
                    :dark="dark"
                    label="Ok"
                  />
                </div>
              </q-toolbar-title>
            </q-toolbar>

            <div class="layout">
              <q-table
                hide-header
                hide-bottom
                :data="tableDataDoctorModal"
                :columns="columnsDoctorModal"
                :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }"
                :dark="dark"
                :filter="searchDoctor"
              >
                <template slot="top-left">
                  <q-search
                    hide-underline
                    v-model="searchDoctor"
                    :color="color"
                    :dark="dark"
                    placeholder="Pesquisar"
                  />
                </template>
                <template slot="body" slot-scope="props">
                  <q-tr :props="props">
                    <q-td auto-width>{{ props.row.id }}</q-td>
                    <q-td>{{ props.row.doctorName }}</q-td>
                    <q-td auto-width>
                      <q-btn
                        flat
                        dense
                        round
                        icon="keyboard_arrow_right"
                        @click="
                          (perfphyPosition.perfphyfullname =
                            props.row.doctorName),
                            (doctorModal = false)
                        "
                      />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </q-modal-layout>
        </q-modal>
        <q-modal
          v-model="workStationModal"
          position="top"
          :content-css="{ minWidth: '30vw', minHeight: '50vh' }"
          class="q-mt-xl"
        >
          <q-modal-layout :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }">
            <q-toolbar class="no-shadow" :text-color="color" color="none" slot="header">
              <q-toolbar-title :class="{ 'text-grey-10': !dark, 'text-white': dark }">
                <div class="row">
                  <div class="col-11 q-py-sm">Estação de Trabalho</div>
                  <div class="col-1 q-pl-md">
                    <q-btn
                      round
                      flat
                      dense
                      size="md"
                      :color="color"
                      icon="close"
                      @click="workStationModal = false"
                    />
                  </div>
                </div>
              </q-toolbar-title>
            </q-toolbar>

            <q-toolbar class="no-shadow" text-color="primary" color="none" slot="footer">
              <q-toolbar-title class="no-shadow">
                <div class="row justify-center">
                  <q-btn
                    class="q-mr-md"
                    size="md"
                    :color="color"
                    @click="workStationModal = false"
                    :dark="dark"
                    label="Cancelar"
                  />
                  <q-btn
                    dense
                    :color="color"
                    size="md"
                    style="width:20%;"
                    @click="workStationModal = false"
                    :dark="dark"
                    label="Ok"
                  />
                </div>
              </q-toolbar-title>
            </q-toolbar>

            <div class="layout">
              <q-table
                hide-header
                hide-bottom
                :data="tableDataWorkStationModal"
                :columns="columnsWorkStationModal"
                :class="{ 'bg-grey-10': dark, 'bg-white': dark == false }"
                :dark="dark"
                :filter="searchWorkStation"
              >
                <template slot="top-left">
                  <q-search
                    hide-underline
                    v-model="searchWorkStation"
                    :color="color"
                    :dark="dark"
                    placeholder="Pesquisar"
                  />
                </template>
                <template slot="body" slot-scope="props">
                  <q-tr :props="props">
                    <q-td auto-width>{{ props.row.code }}</q-td>
                    <q-td>{{ props.row.workStationName }}</q-td>
                    <q-td auto-width>
                      <q-btn
                        flat
                        dense
                        round
                        icon="keyboard_arrow_right"
                        @click="
                          (workStationPosition.workstationname =
                            props.row.workStationName),
                            (workStationModal = false)
                        "
                      />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </q-modal-layout>
        </q-modal>
      </q-page>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
import {
  columns,
  visibleColumns,
  tableData,
  columnsDoctorModal,
  tableDataDoctorModal,
  columnsWorkStationModal,
  tableDataWorkStationModal
} from "./tablesColumns/home.js";

export default {
  name: "PageHome",
  data: () => ({
    filter: "",
    searchDoctor: "",
    searchWorkStation: "",
    pagination: {
      sortBy: null, // String, column "name" property value
      descending: false,
      page: 1,
      rowsPerPage: 10 // current rows per page being displayed
    },
    loading: true,
    perfphyPosition: "",
    workStationPosition: "",
    columns,
    columnsDoctorModal,
    columnsWorkStationModal,
    doctorModal: false,
    workStationModal: false,
    tableData: [],
    tableDataDoctorModal,
    tableDataWorkStationModal,
    visibleColumns
  }),
  methods: {
    dateFormatter(data) {
      return date.formatDate(data, "DD/MM/YYYY");
    },
    
    openStudyDetail(row) {
      this.$router.push({
        name: "exame",
        params: { id: row.id }
      });
    },
    fillEmptyInput(row) {
      if (row.perfphyfullname == "" || row.perfphyfullname == null) {
        row.perfphyfullname = "NÃO INFORMADO";
      }
      if (row.workstationname == "" || row.workstationname == null) {
        row.workstationname = "NÃO INFORMADO";
      }
    },
    fillTable() {
      setTimeout(() => {
        tableData.forEach(data => {
          this.tableData.push(data);
        });

        this.loading = false;
      }, 2000);
    },
    changeColumnOrder(atual, anterior, side) {
      this.columns.sort((a, b) => {
        if (side == "none") {
          return -1;
        } else if (
          a.name === atual.name &&
          b.name === anterior.name &&
          side == "left"
        ) {
          a.index = b.index;
          b.index = a.index + 1;
          return a.index - b.index;
        } else if (
          b.name === atual.name &&
          a.name === anterior.name &&
          side == "right"
        ) {
          b.index = a.index;
          a.index = b.index - 1;
          return a.index - b.index;
        } else {
          return 0;
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      color: "getColor",
      glossy: "getGlossy",
      dark: "getDarken"
    })
    
  },
  beforeMount() {
    this.fillTable();
  }
};
</script>
