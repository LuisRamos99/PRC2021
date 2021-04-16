<template>
  <div id="pubs">
    <h2>Publications Available</h2>
    <v-container data-app>
    		<v-data-table :headers="headers" :items="pubs" :items-per-page="10" class="elevation-1" @click:row="handleClick">	
    		</v-data-table>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "pubs",

  data() {
    return {
      pubs: [],
    };
  },

  created: function () {
    axios.get("/api-server/pubs")
      .then(dados => {
        this.pubs =  dados.data.results.bindings.map(bind => {
              return ({
                  id: bind.s.value.split('#')[1],
                  title: bind.title.value,
                  type: bind.type.value.split('#')[1],
                  year: bind.year.value
              })
            });
      })
      .catch(e => console.log(e))
  },

  methods : {
      handleClick: function(value){
          this.$router.push('/pubs/' + value.id)
      }
  },

  computed: {
      	headers () {
        	return [
          		{ text: 'ID', align: 'start', value: 'id'},
          		{ text: 'Title', value: 'title' },
          		{ text: 'Type', value: 'type' },
          		{ text: 'Year', value: 'year' },
        	]
      	},
    },
}; 
</script>

<style>

</style>