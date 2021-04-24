<template>
    <AccountInfo>
        <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
    </AccountInfo>
</template>
<script>
import AccountInfo from '@/views/components/Account-Info.vue'
export default {
    components:{
        AccountInfo
    }
}
</script>