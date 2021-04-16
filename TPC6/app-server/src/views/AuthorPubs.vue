<template>
  <div id="authorPubs">
    <h2>Author {{this.idAuthor}}</h2>
    <v-container data-app>
    	<v-data-table :headers="headers" :items="authorPubs" :items-per-page="10" class="elevation-1">	
    	</v-data-table>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "authorPubs",

  data() {
    return {
      authorPubs: [],
      idAuthor: this.$route.params.id
    };
  },

  created: function () {
    axios.get('/api-server/authors/'+this.idAuthor+'/pubs')
      .then(dados => {
        this.authorPubs =  dados.data.results.bindings.map(bind => {
              return ({
                  id: bind.pub.value.split('#')[1],
                  title: bind.title.value,
                  type: bind.type.value.split('#')[1],
                  year: bind.year.value
              })
            });
      })
      .catch(e => console.log(e))
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
