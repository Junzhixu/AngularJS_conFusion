import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';

import { Observable } from 'rxjs/Observable';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    host: {
        '[@flyInOut]' : 'true',
        'style': 'display: block;'
    },
    animations:[
        flyInOut(),
        expand()
    ]
})
export class ContactComponent implements OnInit {

    feedbackForm: FormGroup;
    feedback: Feedback;
    showForm = true;
    submitting = false;
    contactType = ContactType;
    formErrors = {
        'firstname': '',
        'lastname': '',
        'telnum': '',
        'email': ''
    };

    validationMessages = {
        'firstname': {
            'required': 'First Name is required.',
            'minlength': 'First Name must be at least 2 characters long',
            'maxlength': 'First Name cannot be more than 25 characters long'
        },
        'lastname': {
            'required': 'Last Name is required.',
            'minlength': 'Last Name must be at least 2 characters long',
            'maxlength': 'Last Name cannot be more than 25 characters long'
        },
        'telnum': {
            'required': 'Tel. Number is required.',
            'pattern': 'Tel. Number must contains only numebrs'
        },
        'email': {
            'required': 'Email is required',
            'email': 'Email not in valid format'
        }
    };

    constructor(private feedbackservice: FeedbackService,
        private fb: FormBuilder,
        @Inject('BaseURL') private BaseURL) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm(){
        this.feedbackForm = this.fb.group({
            firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            telnum: [0, [Validators.required, Validators.pattern]],
            email: ['', [Validators.required, Validators.email]],
            agree: false,
            contacttype: 'None',
            message: ''
        });

        this.feedbackForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set form validation messages
    }

    onValueChanged(data? : any){
        if(!this.feedbackForm){
            return;
        }
        const form = this.feedbackForm;
        for(const field in this.formErrors){
            this.formErrors[field] = '';
            const control = form.get(field);
            if(control && control.dirty && !control.valid){
                const messages = this.validationMessages[field];
                for(const key in control.errors){
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    onSubmit(){
        this.submitting = true;
        this.showForm = false;
        this.feedback = this.feedbackForm.value;
        this.feedbackservice.submitFeedback(this.feedback)
            .subscribe(feedback => {this.feedback = feedback;
                this.submitting = false;
        });
        setTimeout(() => {
            this.feedback = null;
            this.showForm = true;
            this.feedbackForm.reset({
                firstname: '',
                lastname: '',
                telnum: '',
                email: '',
                agree: false,
                contacttype: 'None',
                message: ''
            });
        }, 5000);
    }
}
