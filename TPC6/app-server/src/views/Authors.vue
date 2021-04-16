<template>
  <div id="authors">
    <h2>Authors</h2>
    <table class="w3-table-all">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Total of Publications</th>
      </tr>
      <tr v-for="(triplo,i) in authors" :key="i">
        <td> {{triplo.id}} </td>
        <td> {{triplo.name}} </td>
        <td @click="handleClick(triplo)"> {{triplo.total}} </td>
      </tr>
    </table> 
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "authors",

  data() {
    return {
      authors: [],
    };
  },

  created: function () {
    axios.get("/api-server/authors")
      .then(dados => {
        this.authors =  dados.data.results.bindings.map(bind => {
              return ({
                  id: bind.s.value.split('#')[1],
                  name: bind.name.value,
                  total: bind.total.value,
              })
            });
      })
      .catch(e => console.log(e))
  },

  methods : {
      handleClick: function(value){
          this.$router.push('/authors/' + value.id + '/pubs')
      }
  }
};
</script>

