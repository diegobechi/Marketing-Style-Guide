<?php
    // require 'vendor/autoload.php';
    $page_title = 'Developers';
    $page_description = 'Explore the possibilities to customize subscriptions for your brand.';
    $page_keywords = 'Recharge API, API, Shopify, customize, pro';
    $page_class = 'api';
    $page_active = 'api';
    $navbar_button = '<a href="#request-access" class="button button--large button--magenta navbar-button-right pull-right request-access-button" style="display: none;">Request Access</a>';
?>
<?php include('includes/header.php'); ?>

<header class="banner banner--modern banner--api">
    <div class="banner__content">
        <h1 class="banner__title">ReCharge API</h1>
        <h4 class="banner__subtitle">Solve your complex subscription needs</h4>
        <a href="#request-access" class="button button--large button--transparent request-access-button">Request Access</a>
    </div>
    <div class="banner__background"></div>
</header>

<div class="api__block api__block--api-workflows">
    <div class="api-workflows">
        <div class="layout">
            <div class="grid__sm__6 api-workflows--left">
                <div class="api-workflows__item"> 
                    <h3 class="api-workflows__item__title">Create custom workflows</h3> 
                    <h5>Use the ReCharge API to build the custom solutions you need to grow your business:</h5>
                    <ul class="check__list">
                        <li>Automate your email marketing</li>
                        <li>Create free trials of your subscription products</li>
                        <li>Cross-sell other subscription products</li>
                        <li>Build custom cancellation flows to reduce churn</li>
                    </ul>
                </div>
            </div>
            <div class="grid__sm__6">
                <div class="api-workflows__item api-workflows__item--image">
                    <div class="image-box">
                        <img src="assets/images/api/API_customWorkflows.png">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="api__block api__block--api-insights">
    <div class="api-insights">
        <div class="layout">
            <div class="grid__sm__6 api-insights--left">
                <div class="api-insights__item api-insights__item--image">
                    <div class="image-box">
                        <img src="assets/images/api/API_insights.jpg">
                    </div>
                </div>
            </div>
            <div class="grid__sm__6">
                <div class="api-insights__item"> 
                    <h3 class="api-insights__item__title">Collect valuable insights</h3> 
                    <h5>Get all the insights you need to grow your customer base – and your business:</h5>
                    <ul class="check__list">
                        <li>Get specific data and customized reports</li>
                        <li>Send surveys to collect customer insights</li>
                        <li>Generate real-time analytics</li>
                        <li>Build custom cancellation flows to reduce churn</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="api__block api__block--api-customerportal">
    <div class="api-customerportal">
        <div class="layout">
            <div class="grid__sm__6 api-customerportal--left">
                <div class="api-customerportal__item"> 
                    <h3 class="api-customerportal__item__title">Tailor your customer portal</h3> 
                    <h5>Now you can customize how your customers manage their subscriptions and account details:</h5>
                    <ul class="check__list">
                        <li>Change the look and feel of your customer portal to match your brand</li>
                        <li>Create a seamless user experience across your entire store</li>
                        <li>Add or remove functionality on the portal</li>
                        <li>Develop a custom product page and checkout experience</li>
                    </ul>
                </div>
            </div>
            <div class="grid__sm__6">
                <div class="api-customerportal__item api-customerportal__item--image">
                    <div class="image-box">
                        <img src="assets/images/api/API_CustomerPortal.jpg" class="customerportal">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="api__block api__block--thirdparty-integrations">
    <div class="thirdparty-integrations">
        <h1>Use ReCharge with other tools</h1>
        <p>The API allows for more third-party integrations with ReCharge, <br>so all the parts of your business can work together:</p>
        <div class="thirdparty-integrations--grid container">
            <div class="layout">
                <div class="grid__xs__12 grid__sm__6 grid__md__6">
                    <div class="thirdparty-integrations__item">
                        <img class="thirdparty-integrations__item--image loyalty" src="../assets/images/api/laptop.svg">
                        <label>Loyalty programs</label>
                    </div>
                </div>
                <div class="grid__xs__12 grid__sm__6 grid__md__6">
                    <div class="thirdparty-integrations__item">
                        <img class="thirdparty-integrations__item--image analytics" src="../assets/images/api/growth.svg">
                        <label>Reporting and analytics</label>
                    </div>
                </div>
                </div>
            <div class="layout">
                <div class="grid__xs__12 grid__sm__6 grid__md__6">
                    <div class="thirdparty-integrations__item">
                        <img class="thirdparty-integrations__item--image marketing" src="../assets/images/api/notifications.svg">
                        <label>Marketing automation <br>and metrics</label>
                    </div>
                </div>
                <div class="grid__xs__12 grid__sm__6 grid__md__6">
                    <div class="thirdparty-integrations__item">
                        <img class="thirdparty-integrations__item--image emails" src="../assets/images/api/email.svg">
                        <label>Trigger-based emails</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="api__block api__block--contact-form" id="request-access">
    <div class="get-started">
        <div class="get-started__item get-started__item--contact" id="get-started-card">
            <form action="/mail-inquiry" method="post" id="contact-form" target="_blank" class="get-started__item__form">
                <fieldset>
                    <input type="text" class="form__input" name="name" placeholder="Developer name" data-message="Please enter your name" required>
                    <input type="email" class="form__input" name="email" placeholder="Developer email" data-message="Please enter your email" data-regex="/.+@.+\..+/i" required>
                    <input type="text" class="form__input" name="storeUrl" placeholder="Store URL" data-message="Please enter your store URL" required>
                    <select name="subscribers" class="get-started__dropdown form__select text--left" data-message="Please enter your subscribers count" required>
                        <option value="">Your subscriber count...</option>
                        <option value="Just getting started">Just getting started</option>
                        <option value="100-1000 subscribers">100-1000 subscribers</option>
                        <option value="1000-20000 subscribers">1000-20000 subscribers</option>
                        <option value="20000+ subscribers">20000+ subscribers</option>
                    </select>
                    <select name="api-usage" class="get-started__dropdown form__select text--left" data-message="Please enter how you will use the API" required>
                        <option value="">How will you be using the API?</option>
                        <option value="Custom checkout flows">Custom checkout flows</option>
                        <option value="Marketing automation">Marketing automation</option>
                        <option value="Reporting &amp; Analytics automation">Reporting &amp; Analytics automation</option>
                        <option value="Fulfillment automation">Fulfillment automation</option>
                        <option value="Development requiring ReCharge webhooks">Development requiring ReCharge webhooks</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="hidden" name="thanksSubject" value="API REQUEST">
                    <input type="hidden" name="pageFrom" value="API">
                    <input type="hidden" name="thanksMessage" value="The ReCharge Pro team has received your inquiry and will be in touch within one business day. If you would like to follow up on this request, please send an email to support@rechargepayments.com with your store URL included in the message.">
                    <p class="form__errors" hidden></p>
                </fieldset>
            </form>
            <button id="submit-button" class="button button--large button--block button--magenta">Request Access</button>
        </div>
    </div>
</div>


<div class="api__block api__block--api-growithus">
    <div class="api-growithus">
        <div class="layout">
            <h1 class="api-growithus__title">Grow your business with the ReCharge API</h1>           
        </div>
        <div class="layout">
            <div class="grid__sm__6">
                <div class="api-growithus__item api-growithus__item--hubble">
                    <div class="hubble__box">
                        <img src="/assets/images/api/Hubble_white.png">
                    </div>
                </div>
            </div>
            <div class="grid__sm__6">
                <div class="api-growithus__item"> 
                    <p class="api-growithus__item__details">Within the first three months of using ReCharge and its powerful API, Hubble gained more than 17,000 customers and started to process more than 600 orders daily.</p>
                    <div class="api-growithus__item__details__button">
                        <a href="/case-studies?Hubble" class="button button--large button--transparent">Read the Case Study</a>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</div>

<div class="api__block api__block--chat-box">
    <div class="api__container api__container--chat-box">
        <div class="chat__box">
            <p class="chat__box__content">"As a fast-growing company we need to pull specific data to help forecast our inventory, We use the ReCharge API to create custom reporting and analytics in real-time."</p>
            <div class="chat__box__ref">
                <h5 class="chat__box__ref__title">Paul Rodgers</h5>
                <p class="chat__box__ref__description">CTO, Hubble Contacts</p>
            </div>
        </div>
    </div>
</div>


<div class="api__block api__block--api-developer">
    <div class="api-developer">
        <div class="api-developer__container">
            <div class="api-developer__header">
                <h1 class="api-developer__header__title">Are you a developer?</h1>
                <label>ReCharge provides RESTful API, with robust documentation <br>and full developer support from the ReCharge team.</label>
            </div>
            <div class="api-developer__features">
                <div class="layout">
                    <div class="grid__sm__6 grid__md__4 api-developer__features__item">
                        <h5 class="api-developer__features__item__title">Customize for clients</h5>
                        <p class="api-developer__features__item__details">Break the boundaries of the ReCharge app and fully customize how subscriptions work for your clients</p>
                    </div>
                    <div class="grid__sm__6 grid__md__4 api-developer__features__item">
                        <h5 class="api-developer__features__item__title">Build your own app</h5>
                        <p class="api-developer__features__item__details">Now you can build off the ReCharge platform and create your own solutions</p>
                    </div>
                    <div class="grid__sm__6 grid__md__4 api-developer__features__item">
                        <h5 class="api-developer__features__item__title">Become a partner</h5>
                        <p class="api-developer__features__item__details">Gain access to our API documentation with a ReCharge Pro account</p>
                    </div>
                </div>
                <div class="layout">
                    <div class="api-developer__button">
                        <a href="/partners"class="button button--large button--transparent">Become a Partner Developer</a>    
                    </div>                    
                </div>
            </div>
        </div>    
    </div>
</div>

<?php include('includes/footer.php'); ?>

<script>
    $(function() {
        let jForm = $('#contact-form'),
            rcForm = recharge.validations.addValidations(jForm),
            submitButton = $('#submit-button');

        submitButton.click(function() {
            if (rcForm.validate()) {
                rcForm.submit();
            } else {
                console.info('validation failed');
            }
        });

        $('.request-access-button').click(function(e) {
            e.preventDefault();

            if ($(window).width() < 767) {
                let index = window.location.href.indexOf('#');
                if (index === -1) {
                    window.location.href += '#get-started-card';
                } else {
                    window.location.href = window.location.href.substr(0, index) + '#get-started-card'; 
                }
            } else {
                window.location = $(this).attr('href');
            }
        });
    });
</script>