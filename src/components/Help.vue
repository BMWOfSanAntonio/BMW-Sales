<template>
  <v-container>
    <v-row justify="center">
      <v-col col="12" lg="8">
        <div class="display-3">Help</div>
      </v-col>
      <v-col col="12" lg="8">
        <div
          class="subtitle1"
        >Welcome to the help section! Here you will be able to learn just about everything there is to know about this web application. Please remember that this application is for you! If there is something that is broken let either Austing or myself know! If associates are not using the application the correct way, let us know.</div>
        <div class="display-1">General Knowledge</div>
        <div class="headline">How It All Works: A brief overview</div>
        <div
          class="body-1"
        >A sales associate will put in a request for one of two things, either a we owe request or a make ready request. When the request is submitted it will go to the sales managers for approval. The sales associate will go speak with a sales manager and dicuss the submission. If all is good the request will be approved and sent to the approiate departments in order to continue the process. If the sales manager does not approve the request, the sales associate may be asked to submit another request with updated information.</div>
        <div class="title">Make Ready Request Route</div>
        <div
          class="body-1"
        >When a make ready request is submitted the request will go to a sales manager for approval. There are two things that need to be approved for a make ready request. The first is the actual make ready request. Once approved it is sent to that parts department if needed as well as the detail department to be worked on. The second is the finance request. Once this portion is approved the request will be sent to the finance department to be worked on.</div>
        <div class="title">We Owe Route</div>
        <div
          class="body-1"
        >When a we owe request is submitted the request will go to a sales manager for approval. Assuming the request get approved it will be sent to the parts department for them to bill out to the stock number and stage for either the customer to pick up, the sales associate to pick up, or to ship to the customer.</div>
      </v-col>
      <v-col cols="12" lg="8">
        <div class="display-1">Sales Associate</div>
        <div class="headline">Submit A Request</div>
        <div
          class="body-1"
        >In order to submit a request, whether it is a make ready or we owe request, you will need to navigate to the request page. Only sales associates and sales managers have access to submit a request. You can navigate to the request page by clicking the ☰ located in the in top left hand corner of the site. This will open up the navigation menu. You will then click on the link labeled as "Request". Please see the image below for details.</div>
        <v-row align="center" justify="center">
          <v-img
            src="static\navigate to request page.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>

        <div
          class="body-1"
        >Once you have landed on the request page you will see a toggle switch. This switch will allow you to stay on the same page and send either a make ready request or a we owe request. Simply click on the toggle switch and it will change between the request forms.</div>
        <div class="title">Make Ready Request</div>
        <div
          class="body-1"
        >When filling out the make ready request form please make sure that you fill out everything that has a * next to it. Some fields require you to type and other fields are drop down menus. This form should function extrememly similar to the form from the last version of the site. Once you have filled out the form completely and you are satisfied click on the submit make ready form request button located at the bottom of the form. Please see the image below for details.</div>
        <div class="body-2">
          <span>Customer Care Package:</span> There is a question labled as "Customer Care Package", if you have sold a customer care package mark it here as a yes. The parts department will see that you sold the customer care package and go ahead and pull it for you. If you didn't sell the customer care package and the car is either a new or loaner parts will know to get you the carpet mats.
          <span>If you sell the customer care package remember to tell your customer that parts is going to keep the carpet mats! This is the reason we can give the customer such a good deal on the all weather mats.</span>
        </div>
        <div class="body-2">
          <span>Front License Plate Bracket:</span> There is a question labeled as "Does your customer want their front plate bracket installed". Ask your customer if they would like us to install their bracket will the car is going through the make ready process. This should make it a lot easier when the customer comes back in to get their plates installed.
          <span>If your customer doesn't want to get it installed now or is unsure in anyway let them know that we can put it on when they come back in for there plates. However, the process might take a little longer.</span>
        </div>
        <v-row align="center" justify="center">
          <v-img
            src="static\submit request.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>
        <div class="title">We Owe Request</div>
        <div
          class="body-1"
        >By default when you go to the request page you will see the make ready request form. Click on the toggle switch above the form headline. This will allow you to toggle between the make ready request form and the we owe request form. Once you have toggled to the make ready request form begin filling out the form. Make sure to fill out all fields that have a * next to them. When you are ready to submit your request click on the button labeled "Submit We Owe Request".</div>
        <div class="body-2">
          <span>Shipping to a Customer:</span> If you would like the parts department to ship the items requested in the we owe to a customer you will need to do the following things: the address, city, state, and zip code fields should be filled out. You will also need to make sure the toggle at the bottom of the page says "Ship to Customer".
          <span>Remember, all freight charges will be placed together with the cost of the items and charged to the stock number by the parts department.</span>
        </div>
        <div class="body-2">
          <span>Formatting for Items Wanted:</span>
          When you are adding the information for what you would like the we owe to be for be as specific as possble. The sales managers and the parts department will be able to see anything typed in the field labeled as "List Items for We Owe".
        </div>
        <v-row align="center" justify="center">
          <v-img
            src="static\submit we owe.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>
        <div
          class="body-1"
        >Once you have submitted your request it will be sent to the sales managers for approval. Make sure that you go and have a conversation with them in some capacity about your request and get them to approve it.</div>
      </v-col>
      <hr />
      <v-col cols="12" lg="8">
        <div class="headline">Track a Request</div>
        <div
          class="body-1"
        >Once you have submitted a request you have the ability to track that request throughout the process. The thought behind this was to limit the amount of walking the sales associate has to do. For example, if you are going over to the parts department to grab floor mats, check to make sure the request is completed first. This will give you the ability to track if your car is currently being detailed or if finance is working on your deal. In order to track a request go to the navigation menu (noted by the ☰ symbol) and click on the button labeled "Track Request". This will drop down and give you two options either a make ready request or we owe request. I will go over both.</div>
        <v-row align="center" justify="center">
          <v-img
            src="static\navigate to tracking.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>

        <div class="title">Make Ready Tracking: In Progress</div>
        <div
          class="body-1"
        >When you click on the link labeled as Make Ready: In Progress (first click on the tracking request button and then the make ready button, see instructions above if you need clarification) you will be take to the page where you can track the progress of your make ready request. This will be a place where you can see any request that has been put into the queue. There are several different columns here, below each will be explained.</div>
        <div class="body-2">
          <span>#:</span> This column tells you the place the request is in queue. This is an easy way to be able to tell exactly how many cars are in the queue.
        </div>
        <div class="body-2">
          <span>Sales associate:</span> This column should have your Google profile picture as well as your name. If there are any errors here please let me know.
          <span>Make sure that you only put requests under your name. Do not put a request in for someone else. The data will become skewed if some are submitting a request for someone else.</span>
        </div>
        <div class="body-2">
          <span>Type of Vehicle:</span> This is the type of vehicle that was sold. The options are either new, pre-owned, or loaner.
        </div>
        <div class="body-2">
          <span>Stock Number:</span> This should be the last the stocking number we as a dealership use to identify the car.
        </div>
        <div class="body-2">
          <span>Sales Make Ready Status:</span> When your manager has approved your car to go through the make ready process you will be able to see the results here. If your request has not yet been approve you will see a yellow badge that says "Waiting for Approval". If your request is approved you will see a green badge that says "Approved by 'Manager Name'. If your request is declined it will drop off of the in progress view and you will be able to view any denied request in the Make Ready: Denied section.
        </div>
        <div class="body-2">
          <span>Sales Finance Status:</span> When your customer is here and your manager has approved your car to go into the finance queue you will be able to see the results here. If your request has not yet been approve you will see a yellow badge that says "Waiting for Approval". If your request is approved you will see a green badge that says "Approved by 'Manager Name'.
        </div>
        <div class="body-2">
          <span>Parts Status:</span> Before your manager has approved your make ready request the parts status will be a yellow badge that says "Waiting for Approval". Once your sales manager has approved your make ready request the status will change from "Waiting for Approval" to "Currently Waiting". Parts will now have your request on their dispatch. When a parts associate claims your request the status will change to a blue badge that says "Claimed by 'Parts Associate name'", This means they are actively working on filling your request. When the status turns to a green badge that says "Complete by 'Parts Associate name'", this means that your request is complete and you can pick up your mats or accessories from the parts department. If parts needed to be ordered to fill your request it will be noted with an extra badge that says "Parts on Order". This means that all parts were not in stock. Check with the parts associate that filled the request in order to determine an ETA.
        </div>
        <div class="body-2">
          <span>Finance Status:</span> Before your manager has approved your make ready request the parts status will be a yellow badge that says "Waiting for Approval". Once your sales manager has approved your make ready request the status will change from "Waiting for Approval" to "Currently Waiting". Parts will now have your request on their dispatch. When a parts associate claims your request the status will change to a blue badge that says "Claimed by 'Parts Associate name'", This means they are actively working on filling your request. When the status turns to a green badge that says "Complete by 'Parts Associate name'", this means that your request is complete and you can pick up your mats or accessories from the parts department. If parts needed to be ordered to fill your request it will be noted with an extra badge that says "Parts on Order". This means that all parts were not in stock. Check with the parts associate that filled the request in order to determine an ETA.
        </div>
        <div class="body-2">
          <span>Detail Status:</span> Before your manager has approved your make ready request the detail status will be a yellow badge that says "Waiting for Approval". Once your request gets approved the status will change to a yellow badge that says "Currently Waiting". Detail will now have a request in their queue and will start working on the car as soon as possible. When a member of the detail team starts working on the car your detail status will change to a blue badge that says "Claimed by ValetBMWSA". The detail team is using a generic Principle Auto email address for now. Once the detail team has completed your vehicle and parked it in one of the delivery areas (either a delivery bay or the delivery bay overflow) it will be marked as complete. When your request is marked as complete the badge will change to green and will say "Complete by ValetBMWSA".
          <span>*NOTE*: Your car will not start being detailed until you have a make ready request put through. The detail team has been instructed to notify a manager and not work on the vehicle until a request has been received.</span>
        </div>
        <div class="body-2">
          <span>Delivery Bay:</span> When you vehicle's detail has been complete the location of the vehicle will appear here. The options are either delivery bay 1-4 or the delivery bay overflow.
        </div>
        <v-row align="center" justify="center">
          <v-img
            src="static\MakeReadyInProgress.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>
        <div class="title">We Owe Tracking: In Progress</div>
        <div
          class="body-1"
        >When you click on the link labeled as We Owe: In Progress (first click on the tracking request button and then the we owe button, see instructions above if you need clarification) you will be taken to the page where you can track the progress of your we owe request. This will be a place where you can see any request that has been put into the queue. There are several different columns here, below each will be explained.</div>
        <div class="body-2">
          <span>#:</span> This column tells you the place the request is in queue. This is an easy way to be able to tell exactly how many cars are in the queue.
        </div>
        <div class="body-2">
          <span>Sales associate:</span> This column should have your Google profile picture as well as your name. If there are any errors here please let me know.
          <span>Make sure that you only put requests under your name. Do not put a request in for someone else. The data will become skewed if some are submitting a request for someone else.</span>
        </div>
        <div class="body-2">
          <span>Type of Vehicle:</span> This is the type of vehicle that was sold. The options are either new, pre-owned, or loaner.
        </div>
        <div class="body-2">
          <span>Stock Number:</span> This should be the last the stocking number we as a dealership use to identify the car.
        </div>
        <div class="body-2">
          <span>Sales Status:</span>
          This field is to show if your request has/has not been approved by your sales management team. When you first submit your request it will show up as in progress. You will see a yellow badge that says "Waiting for Approval". This means that your request has not yet been approved or denied. Once your request has been approved the badge will change from yellow to green. It will now say "Approved by {Sales Manager}".
        </div>
        <div class="body-2">
          <span>Parts Status:</span>
          This field is to show the progress of your request in the parts department. When you first submit your request it will show up as a yellow badge that says "Waiting for Sales Approval". This means that your request has not yet been approved by the sales management team and parts doesn't not yet know about this request. Once your request has been approved the badge will still be yellow but change to say "Currently Waiting". This means that your request is now in the parts departments queue and they will start working on it as soon as possible. Once a parts associate does start working on your request the badge will change from yellow to blue and say "Claimed by {Parts Associate}". Once the request has been completed it will fall off of this view as the request will be completed at this point. Please continue to read the make ready: complete information.
        </div>
        <v-row align="center" justify="center">
          <v-img
            src="static\we owe in progress.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>
        <div class="title">We Owe Tracking: Complete</div>
        <div
          class="body-1"
        >When you click on the link labeled as We Owe: Complete (first click on the tracking request button and then the we owe button, see instructions above if you need clarification) you will be taken to the page where you can see completed we owe requests. This will be a place where you can see the last 50 we owe requests that have been completed. We are limiting this to 50 because we do have to pay for all the data we use. If you need to find out more information about a specific we owe please let James Shiflett or Austin Hughes know and that information can be gotten for you. This page contains the exact same infromation as the we owe: in progress page, but this will only show request that have been approved by a sales manager and completed by parts. Please note: If you look at your request and see that there is a red badge that says "Parts on Order" under that parts status it means all of the items your requested we not in stock. The sales associate should take it upon themselves to either go speak with someone in parts or send an email to the associate that complete the request for more information.</div>
        <v-row align="center" justify="center">
          <v-img
            src="static\weowecomplete.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>
      </v-col>
      <v-col cols="12" lg="8">
        <div class="display-1">Sales Managers</div>
        <div class="headline">General Information</div>
        <div class="title">Navigating to the Sales Manager View</div>
        <div
          class="body-1"
        >In order to get to the sales manager view you will need to click on the menu icon located in the top left of the page and navigate down to the button that says "Sales". This will take you to the sales manager view.</div>
        <div class="title">How It All Works</div>
        <div
          class="body-1"
        >As a sales manager you can you everything a sales associate can do (submit a request, track a request) as well as approve both make ready and finance requests. It is heavily encourag all sales managers read through the sales associate section. It is very important to know that we you approve a make ready request both parts and detail will now have this request in their queue. They will start actively working on this request unless told otherwise. When you approve the finance request please know that you are essentially saying that the customer is here to start the finance process, the deal folder is signed, and everything in the deal folder is complete with valid dates. One field to note is the Shipping to Customer field under the we owe section. This means that the sales associate would like the items in this request shipped to the customers house. The cost of shipping will the billed to the unit.</div>
        <div
          class="body-1"
        >The picture below is your sales manager view. You should be able to approve everything you need to from this view.</div>
        <v-row align="center" justify="center">
          <v-img
            src="static\salesview.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>
        <div class="headline">Approving Requests</div>
        <div class="title">Approving Make Ready Requests</div>
        <div
          class="body-1"
        >When a sales associate submits a request it will come to you for approval. The request will populate under the "Sold Units" label. All of the information will be presented to you in a table format. You will see two buttons on the right side of each request. To submit a make ready request you will need to click the blue "Make Ready" button. By clicking this button you will send the request to both the parts department and the detail team. If you have not already click the finance button before the make ready button it will become disabled, not allowing you to click it again. If you have already sent this request to finance and then click the make ready button the request will drop off of your view and you as a sales manager are done with this request.</div>
        <div class="title">Approving Finance Requests</div>
        <div
          class="body-1"
        >When a sales associate submits a request it will come to your for approval. The request will populate under the "Sold Units" label. All of the information will be presented to you in a table format. You will see two buttons on the right side of each request. To submit a finance request you will need to click the red "Finance" button. By clicking this button you will send the request to the finance department queue to start being worked on. Remember that by clicking this button you are saying that the customer is here ready to go through finance, the deal folder is signed, and the information in that deal folder is complete with all dates valid. Again if you are click the finance button before the make ready button the finance button will become disabled after clicking. If you have already sent the request to make ready and then click the finance button the request will drop off the sales manager view.</div>
        <div class="title">Approving We Owe Requests</div>
        <div
          class="body-1"
        >When a sales associate submits a we owe request it will come to you for approval. The request will populate under the "We Owes" label. All of the information will be presented to you in a table format. Along with the information about the request you will be presented with two buttons, one green button that says "Approve" and one red button that says "Deny". By clicking either one of the buttons you are doing to perform that action. If you click deny you will stop the request from continuing in the process. If you approve the request the information will be passed to the parts department for them to start working.</div>
        <div class="display-1">Parts Associates</div>
        <div class="headline">Completing a Make Ready Request</div>
        <div class="body-1">
          As a parts associate you will be presented with the view in the picture below. There is a top section labeled as "Make Ready Request". This is where request for sold units will come in. All of the information that you should need in order to complete a request should be avalible for you, it is in table format. When you are ready to work on a request you will click the green button labeled "Claim". A pop up modal window will appear with three questions that are required to be answered. Side note: you can click anywhere off the modal window or the close button to close the modal window, you will still be the associate that has claimed this request. The first question is if this request was sent after hours, this is yes or no question. The second question asks if the parts need to be ordered, this is a yes or no question. If any parts need to be ordered mark this question as yes, this will allow the sales associate to see that parts need to be ordered for this request. If there are parts in stock they should be pulled and staged for the sales associate to pick up. The last question is a input field that asks for the invoice number. The customer care package or any other accessories sold on the make ready request should be billed to the stock number of a front counter invoice. Once all the information is complete click the button labeled "Complete". This will complete the request on the parts side and it will drop off the parts view. There is a button labeled "Unclaim" that can be clicked and it will take your name off the request so that another parts associate can claim the request.
          <span>*Special Note*</span> There is a bug right now where it will still ask you for a invoice number even if the sales associate just wants carpet mats. In this case please just put "0000000" in the input field. I will be working to correct this. Also if the request comes in for a new or loan car and there is not a customer care package sold then the carpet mats need to be pulled for that vehicle.
        </div>
        <v-row align="center" justify="center">
          <v-img
            src="static\partsview.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>
        <v-row align="center" justify="center">
          <v-img
            src="static\partsclaimview.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>
        <div class="headline">Completing a We Owe Request</div>
        <div class="body-1">
          Completing a we owe request is very similar to a make ready request. Under the section labeled as "We Owes" you will be presented with a we owe request in table format. To start working on this request all you need to do is click the green button labeled "Claim". This will pop up two questions in the table. The first questions is if parts need to be ordered to fullfil the request, this is a yes or no question. Again the parts associate will be responsible for staging the parts for the sales associate to either pick up or to ship to the customer.
          <span>*Special Note*</span> there is a section labeled as "Shipping to Customer" under the we owe section. If the value says "Shipping" then the sales associate would like the item shipped to the customer. In this case any freight should be added to the cost of the we owe and billed to the stock number.
        </div>
        <div class="display-1">Finance Associates</div>
        <div class="headline">Completing a Request</div>
        <div
          class="body-1"
        >INFORMATION TO COME! SPEAK WITH AUSTIN OR JAMES IF YOU HAVE ANY QUESTIONS</div>
        <v-row align="center" justify="center">
          <v-img
            src="static\financeview.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>
        <div class="display-1">Detail Associates</div>
        <div class="headline">Completing a Request</div>
        <div
          class="body-1"
        >INFORMATION TO COME! SPEAK WITH AUSTIN OR JAMES IF YOU HAVE ANY QUESTIONS</div>
        <v-row align="center" justify="center">
          <v-img
            src="static\detailview.png"
            aspect-ratio="2"
            class="grey lighten-2"
            max-width="100%"
            max-height="100%"
          ></v-img>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.title,
span {
  font-weight: bold;
}

.body-1,
.body-2,
.display-1,
.subtitle1 {
  margin-bottom: 10px;
}
</style>