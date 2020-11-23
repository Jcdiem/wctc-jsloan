$(document).ready(function () {
    const valRules = {
        salary: {
            required: true,
            digits: true,
            min: 0,
        },
        jobMonths: {
            required: true,
            digits: true,
            min: 0,
        },
        creditScore: {
            required: true,
            digits: true,
            min: 0,
        }
    }

    const valMessages = {
        salary: 'Please enter your yearly salary. If paid by wage, give best estimate.',
        jobMonths: 'Please enter the number of months you have been at your job.',
        creditScore: 'Please enter your current credit score from one of the reporting agencies at https://files.consumerfinance.gov/f/documents/cfpb_consumer-reporting-companies-list.pdf'
    }

    $('#daForm').validate({
            rules: valRules,
            messages: valMessages,
            submitHandler: loanSubmit,
        }
    )

    function loanSubmit() {
        console.debug('Submission');

        const sal = $('#salary').val();
        const jobM = $('#jobMonths').val();
        const credScore = $('#creditScore').val();

        let out = 'Loan approval likelihood is: ';

        if (sal >= 40000) { //Salary greater or equal to 40k
            if (credScore >= 600) {
                out += 'Approval.';
            }
            else if (jobM > 12) {
                out += 'Approval.';
            }
            else{
                out += 'Denial for low credit score and lack of job time.';
            }
        } else if (credScore >= 600) { //Salary less than 40k
            if (jobM > 12) {
                out += 'Approval.';
            } else {
                out += 'Denial for lack of job time.';
            }
        } else {
            out += 'Denial for lack of credit score.';
        }

        $('#loanOut').text(out);
    }
});