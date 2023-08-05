<template>
<div id="novel-menu">
      <h2>Novel Menu</h2>
      <ul id="novel-list">
        <li v-for="fileName in files" :key="fileName">
          <a :href="'#' + fileName.replace('.txt', '')">{{ fileName.replace('.txt', '') }}</a>
        </li>
      </ul>
    </div>
    <div id="novel-content">
      <div v-for="fileName in files" :key="fileName">
        <a :id="fileName.replace('.txt', '')"></a>
        <p v-for="paragraph in paragraphs[fileName]" :key="paragraph" >{{ paragraph }}</p>
      </div>
    </div>

</template>
<script>
export default {
  props:{
        novelurl:{
            type:String,
            required:true
        }
    } 
}


</script>
