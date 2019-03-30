<template>
  <ul>
    <li v-for="book in books" :key="book.id">
      <slot :book="book">
        {{ book.name }}
      </slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'book-list',

  props: {
    books: Array,
  },
};
</script>
