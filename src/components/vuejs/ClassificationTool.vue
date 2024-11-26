<!--
 * ClassificationTool.vue
 *
 * A VueJS component that provides a user the choice of two questionnaire:
 * - Is my information potected?
 * - Is my information classified?
 *
 * This component is the main compontent for the classifiction-tool.astro
 *
 * It instantiates the Questionnaire.vue VueJS component twice, and allows the user to chose which one to display
 -->

<!----------------
  VUEJS HTML TEMPLATE
------------------>
<template>
    <div id="idClassificationTool">
        
        <gcds-text size="caption" character-limit="false">
            
            <button @click="toggleForm('protected')" class="my_button">See if my information is <strong>Protected</strong></button>

            &nbsp;&nbsp;&nbsp;
      
            <button @click="toggleForm('classified')" class="my_button">See if my information is <strong>Classified</strong></button>
    
        </gcds-text>

          <p>&nbsp;</p>

        <!--- PROTECTED QUESTIONNAIRE -->
        <Questionnaire 
            client:load
            evalType="protected"
            :questions="questionsProtected"
            v-show="formProtectedShow" />

        <!--- CLASSIFIED QUESTIONNAIRE -->
        <Questionnaire 
            client:load
            evalType="classified"
            :questions="questionsClassified"
            v-show="formClassifiedShow" />   
        
        <p>&nbsp;</p>
      
    </div>
</template>

<!----------------
    VUEJS SCRIPT
------------------>
<script setup>
    import { ref } from 'vue'
    import questionsProtected from '../../data/questionsProtected.json'
    import questionsClassified from '../../data/questionsClassified.json'
    import Questionnaire from './Questionnaire.vue'

    let formProtectedShow = ref(false)
    let formClassifiedShow = ref(false)

    let myTest = ref('myTest')
    
    // Displays either the Classified questionnaire or the Protected questionnaire to the user
    function toggleForm(choice) {
        // myTest.value = 'in toggleForm for ' + choice
        // reset everything (hide all) before showing the chosen form
        formProtectedShow.value = false
        formClassifiedShow.value = false

        if (choice === 'protected') {
            formProtectedShow.value = true
        }
        
        if (choice === 'classified') {
            formClassifiedShow.value = true
        }
    }
</script>

<style>

.my_button {
    padding: 10px;
    background-color: var(--gcds-bg-primary);
    color: var(--gcds-text-light);
    font-size: 0.8em;
}

</style>