<!--
 * Questionnaire.vue
 *
 * A VueJS component that will render a form as a series of questions each with a Yes, No, N/A choices of answers
 * When the form is submitted, it checks if all questions have been answered and, if so, triggers the event 'form-submitted' to the parent
 *
 * Used by the Information Classification Tool (determine whether information is Protected or Classified)
 *
 * If one of the answers to the question is "YES", then the information is either Protected or Classified (depending ont the questionaire showsn)
 *
 * Props (variables) received from parent component:
 * - evalType: Either 'classified' or 'protected'
 * - questions: an array containing the list of questions
-->

<!----------------
  VUEJS HTML TEMPLATE
------------------>
<template>
    <div id="idForm" class="qForm">

        <gcds-text size="caption" character-limit="false">
        
        <div class="form_heading">{{ formTitle }}</div>

        <form @submit.prevent="submitAnswers">
            <p>{{ formDescription }} </p>

            <div v-for="(q, index) in formQuestionsTracker" :id=q.id class="questionnaire">
                <div class="question">
                    {{ q.number }} . {{ q.text }}
                </div>

                <input type="radio" :id="q.id + 'y'" :name="q.id" value="y" v-model="formQuestionsTracker[index].answer" />
                <label :for="q.id + 'y'" class="choices">Yes</label>

                <input type="radio" :id="q.id + 'n'" :name="q.id" value="n" v-model="formQuestionsTracker[index].answer" />
                <label :for="q.id + 'n'" class="choices">No</label>

                <input type="radio" :id="q.id + 'na'" :name="q.id" value="na" v-model="formQuestionsTracker[index].answer" />
                <label :for="q.id + 'na'" class="choices">N/A</label>
            </div>

            <gcds-button type="submit" button-id="submit-form" name="submit-form" size="small">
                Submit Answers
            </gcds-button>
            myTest = {{ myTest }}
        </form>

        <div id="idErrorMessageP" v-show="showError">
            <br />
            <gcds-error-message message-id="message-propsP">
                {{ errorMsg }}
            </gcds-error-message>
            <br />
        </div>

        <div v-if="showResults" id="idResult">
            
            <div v-if="evalType === 'protected'">
                <div v-if="positiveAnswer">
                    <p class="result">You're information is <strong>PROTECTED</strong><br /></p>
                    
                    <p>Find out at what level (A, B, or C) your information is Protected by performing an <gcds-link href="/en/injury-tool">injury assessment</gcds-link></p>
                </div>
                <div v-else>
                    <p>Although your information is not classified as Protected, it may be Classified. 
                            <button @click="toggleForm('classified')" class="my_button">Click To Find Out</button>
                    </p>
                </div>
            </div>
            <div v-else-if="evalType === 'classified'">
                <div v-if="positiveAnswer">
                    <p>You're information is <strong>CLASSIFIED</strong><br /></p>
                    
                    <p>Find out at what level (Confidential, Secret, or Top Secret) your information is Classified at by performing an <gcds-link href="/en/injury-tool">injury assessment</gcds-link></p>
                </div>
                <div v-else>
                    <p>Although your information is not deemed Classified, it may be Protected. 
                            <button @click="toggleForm('classified')" class="my_button">Click To Find Out</button>
                    </p>
                </div>
            </div>
            <div v-else>
                <p>Answer the above questions then click 'Submit Answers' to know the result.</p>
            </div>
        </div>
        
    </gcds-text>
            
    </div>
</template>

<!----------------
    VUEJS SCRIPT
------------------>
<script setup>
    import { ref } from 'vue'

    // "Arguments" passed within the Questionnaire.vue component, by the parent
    // props are read-only
    const props = defineProps({
        evalType: String,
        questions: Array
    })
    
    // depending on the evalType (props), determine what title and description to display on the questionnaire
    let formTitle = ref('')
    let formDescription = ref('Answer all these questions to find out.')
    if (props.evalType === 'classified') {
        formTitle.value = 'Is My Information CLASSIFIED?'
    } else if (props.evalType === 'protected') {
        formTitle.value = 'Is My Information PROTECTED?'
    }

    // These two variable will be used when not all questions are answered
    let showError = ref(false)
    let errorMsg = ref('')

    // These variable are used to show the results, or not, and determine if one question was answered "YES"
    let showResults = ref(false)
    let positiveAnswer = ref(false)

    // A test variable, used to display in the VueJS HTML for troubleshooting...
    let myTest = ref('myTest')
    
    // Build our formQuestionsTracker that will contain, for each questions:
    // - an ID
    // - the question's number (it's position in the list)
    // - the answer chosen ('y', 'n', 'na'), defaulted to null
    // - the question's text
    let formQuestionsTracker = ref([]);
    for (let i = 0; i < props.questions.length; i++) {
        let number = i+1
        // push a new object in the formQuestionsTracker array
        formQuestionsTracker.value.push({
            id: 'q' + number,
            number: number,
            answer: null,
            text: props.questions[i]
        })
    }
    
    // Function triggered when the user clicks the "submit answers" button 
    // checks that all questions have been 
    // broadcasts an event for the Parent component to listen to if all answers have been answered
    function submitAnswers() {
        showError.value = false
        errorMsg.value = ''
        let unansweredQ = []
        myTest.value = 'in submitAnswers'     

        // Loop through all answers given 
        // Make sure answers are not null (otherwise it means some questions were not answered)
        // Find out if there's at least one 'y' answer, meaning the information is Protected
        for (let i = 0; i < formQuestionsTracker.value.length; i++) {
            if (formQuestionsTracker.value[i].answer) {
                if (formQuestionsTracker.value[i].answer === 'y') {
                    myTest.value = 'answered yes to one of the questions'
                    positiveAnswer.value = true
                }
            } else {
                unansweredQ.push(formQuestionsTracker.value[i].number)
            }
        }       
        
        // if some questions were not answered, show the error message
        // otherwise, show the results
        if (unansweredQ.length > 0) {
            errorMsg.value = 'Please answer all questions. The following questions still need to be answered: ' + unansweredQ.toString();
            showError.value = true
        } else {
            showResults.value = true
        }
    }

</script>

<style>

.qForm {
    border-color: var(--gcds-border-default);
    border: 1px;
    border-style: solid;
    padding: 10px;
}

.form_heading {
    background-color: var(--gcds-bg-primary);
    color: var(--gcds-text-light);
    font-weight: bold;
    font-size: 1.5em;
    padding: 10px;
}

.my_button {
    padding: 10px;
    background-color: var(--gcds-bg-primary);
    color: var(--gcds-text-light);
    font-size: 0.8em;
}

.questionnaire {
    background-color: lightgrey;
    padding: 10px;
    margin: 5px;  
    display:flex;
    align-items: center;
    justify-content: space-between;    
}

.questionnaire .question {
  padding: 10px;  
  color: black;
  width: 100%;
}

.questionnaire .choices {
    padding: 10px;
    word-break: keep-all;
    white-space: nowrap
}

p .result {
    color: maroon;
    font-size: 1em;
}

</style>