
<template>
  <div class="hello">
    <book-list :books="books">
      <template slot-scope="{ book }">
        <span v-if="book.sale">限时优惠</span>
        {{ book.name }}
      </template>
    </book-list>
  </div>
</template>


<script>
// import { mapState } from 'vuex';
import BookList from './slotscope/book-list';

export default {
  name: 'Hello',

  components: {
    BookList,
  },

  data() {
    return {
      books: [
        { id: '123', name: '三国志', sale: true, price: 12 },
      ],
    };
  },

  computed: {
  },

  mounted() {
    console.log(this.$store);
  },

  created() {},
};
</script>
