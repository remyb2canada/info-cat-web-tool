<template>
    <div id="idProtectedQ" :class="formClass">
        <div id="idProtectedQform">
            <gcds-text size="caption" character-limit="false">
                Answer “Yes” or “No” to the following questions to determine if your information is Protected.
            
                <form @submit.prevent>
                    <div v-for="(qText, index) in formQuestions" :id="'q' + index" class="questionnaire">
                        <label for="'q' + index" id="'q' + index" class="">
                            {{ index + 1 }} . {{ qText }}
                        </label>

                        <!-- Input Type Text -->
                        <span class="options">Yes </span>
                        <span class="options">No</span>
                    </div>
                </form>

            </gcds-text>
        </div>

        <div id="idProtectedQresult">asdfsdf
            <gcds-text size="caption" character-limit="false">
                <p v-if="showResult">
                    You're information is DDDD<br />
                    Click here to find out if you're information is Classified.
                </p>
                <p v-else>Answer all questions to know the result.</p>
            </gcds-text>
        </div>
    </div>
</template>starters.json

<script setup>
    import { ref } from 'vue'
    import formQuestions from '../../data/questionsProtected.json'

    // "Arguments" passed within the ProtectedQ component
    // isVisible = 'true' or 'false'
    // questions = an Array of all the questions to display
    const props = defineProps({
        isVisible: String        
    })

    // Build our formQuestionsTracker that will not only list the questions text, but also
    // ID each one, and track whether the user selected yes or no to the question

    const formClass = ref('')

    if (props.isVisible === "false") {
        formClass.value = ".formVisible"
    } else {
        formClass.value = ".formInvisible"
    }
    
    function toggle() {
    // ...
    }
</script>

<style>

.formInvisible {
    display: none;
}

.formVisible {
    display: inline;
}

.questionnaire {
    background-color: blue;
    padding: 10px;
    margin: 5px;  
    display:flex;
    align-items: center;
    justify-content: space-between;    
}

.questionnaire label {
    background-color: red;
  padding: 10px;  
  color: white;
  width: 100%;
}

.questionnaire .options {
    color: white;
    font-weight: bold;
    white-space: nowrap;
    margin-left: 10px;
    margin-right: 10px;
}
</style>