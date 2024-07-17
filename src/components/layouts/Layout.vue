<script setup lang="ts">

</script>


<template>
    <div id="layout">
         <header class="py-3 shadow-lg sticky top-0 bg-gray-800">
            <div class="container">
                <slot name="header"/>
            </div>

         </header>

          <main class="main-app">
            <div  class="container main-container">
                <section :class="$route.path === '/' ? 'content min-h-screen pt-20' : 'content pt-20 min-h-screen'">
                    <slot /> 
                </section>
            </div>

           
          </main> 

        <footer>
            <div class="container">
                <slot name="footer"/>
            </div>
        </footer>
    </div>
</template>



<style lang="scss" scoped>
 .main-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    
    
 }
</style>