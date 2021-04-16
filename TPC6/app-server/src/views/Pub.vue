<template>
  <div id="pub">
    <h2>Publication {{this.id}}</h2>
    <table class="w3-table-all">
      <tr v-for="(triplo,i) in pub" :key="i">
        <td> {{triplo.p}} </td>
        <td> {{triplo.o}} </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "pub",

  data() {
    return {
      pub: [],
      id: this.$route.params.id
    };
  },

  created: function () {
    axios.get("/api-server/pubs/"+this.id)
      .then(dados => {
        this.pub =  dados.data.results.bindings.map(bind => {
              return ({
                p: bind.p.value.split('#')[1],
                o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]
              })
            });
        console.log(pub)
      })
      .catch(e => console.log(e))
  },
}; 
</script>

