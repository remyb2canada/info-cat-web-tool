<!---DEPRECATED VUEJS COMPONENT, NO LONGER USED-->
<!----------------
    VUEJS HTML TEMPLATE
    
    There are two forms:
    1) one is a series of questions to determine if the information is PROTECTED
    2) one is a series of questions to determine if the information is CLASSIFIED

    Depending on which button the user clicks, the right form will be displayed
    Each form has their own handler, which will determine what to show and what not to show:
    - qpHandler: handler for the PROTECTED form
    - qcHandlder: hanlder for the CLASSIFIED Form
------------------>
<template>

    <gcds-text size="caption" character-limit="false">
        <button @click="toggleForm('protected')" class="my_button">See if my information is <strong>Protected</strong></button>

        &nbsp;&nbsp;&nbsp;{{ myTest }}
        
        <button @click="toggleForm('classified')" class="my_button">See if my information is <strong>Classified</strong></button>
        
    </gcds-text>
    
    <!---********************************************* -->
    <!--- QUESTIONNAIRE FORM FOR PROTECTED INFORMATION  -->
    <!---********************************************* -->
    <div id="idFormP" class="qForm" v-show="qpHandler.showForm">
        <gcds-text size="caption" character-limit="false">
        
            <div class="form_heading">Is My Information <strong>PROTECTED?</strong></div>

            <form @submit.prevent="submitAnswersP">
                <p>Answer “Yes” or “No” to the following questions to determine if your information is <strong>Protected</strong>.</p>

                <div v-for="(q, index) in formQuestionsTrackerP" :id=q.id class="questionnaire">
                    <div class="question">
                        {{ q.number }} . {{ q.text }}
                    </div>

                    <input type="radio" :id="q.id + 'y'" :name="q.id" value="y" v-model="formQuestionsTrackerP[index].answer" />
                    <label :for="q.id + 'y'" class="choices">Yes</label>

                    <input type="radio" :id="q.id + 'n'" :name="q.id" value="n" v-model="formQuestionsTrackerP[index].answer" />
                    <label :for="q.id + 'n'" class="choices">No</label>

                    <input type="radio" :id="q.id + 'na'" :name="q.id" value="na" v-model="formQuestionsTrackerP[index].answer" />
                    <label :for="q.id + 'na'" class="choices">N/A</label>
                </div>

                <gcds-button type="submit" button-id="submit-form-protected" name="submit-form-protected" size="small">
                    Submit Answers
                </gcds-button>
            </form>

            <div id="idErrorMessageP" v-show="qpHandler.showError">
                <br />
                <gcds-error-message message-id="message-propsP">
                    {{ qpHandler.errorMsg }}
                </gcds-error-message>
                <br />
            </div>

            <div id="idResultP">
                <div v-if="qpHandler.showResult">
                    <p>You're information is <strong>{{ qpHandler.infoClass }}</strong><br /></p>
                    
                    <div v-if="qpHandler.infoClass === 'Protected'">
                        <p>Find out at what level (A, B, or C) your information is Protected by performing an <gcds-link href="/en/injury-tool">injury assessment</gcds-link></p>
                    </div>
                    <div v-else>
                        <p>Although your information is not classified as Protected, it may be Classified. 
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

    <!---********************************************* -->
    <!--- QUESTIONNAIRE FORM FOR CLASSIFIED INFORMATION  -->
    <!---********************************************* -->
    <div id="idFormC" class="qForm" v-show="qcHandler.showForm">
        <gcds-text size="caption" character-limit="false">
        
            <div class="form_heading">Is My Information <strong>CLASSIFIED?</strong></div>

            <form @submit.prevent="submitAnswersC">
                <p>Answer “Yes” or “No” to the following questions to determine if your information is <strong>Classified</strong>.</p>

                <div v-for="(q, index) in formQuestionsTrackerC" :id=q.id class="questionnaire">
                    <div class="question">
                        {{ q.number }} . {{ q.text }}
                    </div>

                    <input type="radio" :id="q.id + 'y'" :name="q.id" value="y" v-model="formQuestionsTrackerC[index].answer" />
                    <label :for="q.id + 'y'" class="choices">Yes</label>

                    <input type="radio" :id="q.id + 'n'" :name="q.id" value="n" v-model="formQuestionsTrackerC[index].answer" />
                    <label :for="q.id + 'n'" class="choices">No</label>

                    <input type="radio" :id="q.id + 'na'" :name="q.id" value="na" v-model="formQuestionsTrackerC[index].answer" />
                    <label :for="q.id + 'na'" class="choices">N/A</label>
                </div>

                <gcds-button type="submit" button-id="submit-form-classified" name="submit-form-classified" size="small">
                    Submit Answers
                </gcds-button>
            </form>

            <div id="idErrorMessageC" v-show="qcHandler.showError">
                <br />
                <gcds-error-message message-id="message-propsC">
                    {{ qcHandler.errorMsg }}
                </gcds-error-message>
                <br />
            </div>

            <div id="idResultC">
                <div v-if="qcHandler.showResult">
                    <p>You're information is <strong>{{ qcHandler.infoClass }}</strong><br /></p>
                    
                    <div v-if="qpHandler.infoClass === 'Classified'">
                        <p>Find out at what level (Confidential, Secret, or Top Secret) your information is Classified by performing an <gcds-link href="/en/injury-tool">injury assessment</gcds-link></p>
                    </div>
                    <div v-else>
                        <p>Although your information is not Classified, it may be Protected. 
                            <button @click="toggleForm('protected')" class="my_button">Click To Find Out</button>
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
    import questionsProtected from '../../data/questionsProtected.json'
    import questionsClassified from '../../data/questionsClassified.json'

    // These will be handlers for each of the two forms (one for PROTECTED, one for CLASSIFIED)
    // Each handle contains properties that define what to show or hide
    // Only one form (div) is shown on screen. And in that form, the result may be shown or not
    const qpHandler = ref({
        showForm: false,
        showResult: false,
        showError: false,
        errorMsg: '',
        infoClass: 'Unclassified'
    })
    const qcHandler = ref({
        showForm: false,
        showResult: false,
        showError: false,
        errorMsg: '',
        infoClass: 'Unclassified'
    })

    // A test variable, used to display in the VueJS HTML for troubleshooting...
    const myTest = ref('myTest')
    

    // For questionnaire "is my information PROTECTED"
    // Build our formQuestionsTracker that will contain, for each questions:
    // - an ID
    // - the question's number (it's position in the list)
    // - the answer chosen ('y', 'n', 'na'), defaulted to null
    // - the question's text
    const formQuestionsTrackerP = ref([]);
    for (let i = 0; i < questionsProtected.length; i++) {
        let number = i+1
        // push a new object in the formQuestionsTracker array
        formQuestionsTrackerP.value.push({
            id: 'pq' + number,
            number: number,
            answer: null,
            text: questionsProtected[i]
        })
    }
    
    // For questionnaire "is my information CLASSIFIED"
    // Build our formQuestionsTracker that will contain, for each questions:
    // - an ID
    // - the question's number (it's position in the list)
    // - the answer chosen ('y', 'n', 'na'), defaulted to null
    // - the question's text
    const formQuestionsTrackerC = ref([]);
    for (let i = 0; i < questionsClassified.length; i++) {
        let number = i+1
        // push a new object in the formQuestionsTracker array
        formQuestionsTrackerC.value.push({
            id: 'cq' + number,
            number: number,
            answer: null,
            text: questionsClassified[i]
        })
    }

    // function triggered when the user clicks the "submit answers" button on the PROTECTED form
    // Information will be classified as "Protected" if at least one answer is "Yes"
    function submitAnswersP() {
        qpHandler.value.errorMsg = ''
        qpHandler.value.showError = false
        qpHandler.value.infoClass = 'Unclassified'
        
        // Loop through all answers given 
        // Make sure answers are not null (otherwise it means some questions were not answered)
        // Find out if there's at least one 'y' answer, meaning the information is Protected
        let unansweredQ = []

        for (let i = 0; i < formQuestionsTrackerP.value.length; i++) {

            if (formQuestionsTrackerP.value[i].answer) {
                if (formQuestionsTrackerP.value[i].answer === 'y') {
                    qpHandler.value.infoClass = 'Protected'
                }
            } else {
                unansweredQ.push(formQuestionsTrackerP.value[i].number)
            }
        }       
        
        // if some questions were not answered, show the error message
        // otherwise, show the results
        if (unansweredQ.length > 0) {
            qpHandler.value.errorMsg = 'Please answer all questions to know whether your information is Protected or not. The following questions still need to be answered: ' + unansweredQ.toString();
            qpHandler.value.showError = true
        } else {
            qpHandler.value.showResult = true
        }
    }

    // Used by the gcds button to show either the questionnaire for Protected or for Classified information
    function toggleForm(f) {
        qpHandler.value.showForm = false
        qcHandler.value.showForm = false

        if (f === 'protected') {
            qpHandler.value.showForm = true
        } else if (f === 'classified') {
            qcHandler.value.showForm = true
        }
        myTest.value = 'you clicked the button: ' + f
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

</style>