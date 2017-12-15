<?php
$page_title = 'Pricing';
$page_description = 'ReCharge is the best ecommerce subscription solution. It includes everything you need to run a subscription business online. Try free for 90 days.';
$page_keywords = 'Pricing, Cost, Rate, Subscription Fee, Charge, Buy';
$page_class = 'pricing';
$page_active = 'pricing';
?>
<?php include('templates/static/header.php'); ?>


<div class="rc_section__container rc_pricing__hero">
	<div class="rc_section rc_section--hero rc_text--center">
		<div class="rc_content">
			<h1><span>Priced to fit</span> your subscription business</h1>
			<p>Our Standard and Pro plans give you access to the recurring payments solution you can depend on.</p>
		</div>
	</div>
</div>
<div class="pricing-background"></div>
<div class="rc_section__container">
	<div class="rc_section rc_section--pricing_plans">
		<div class="rc_layout__container">
			<div class="rc_layout rc_pricing__plan__container rc_text--center">
				<div class="rc_layout__md__6">
					<div class="rc_pricing__plan rc_pricing__plan--regular rc_shadow_level5">
						<div class="rc_pricing__plan_header" >
							<span>Standard</span>
							<div>
								<p>Up to $100,000 in MRR</p>
							</div>
						</div>
						<div class="rc_pricing__plan_body">
							<p>$19,99 per month +</p>
							<h4>1% per recurring order</h4>
							<div>
								<ul class="rc_text--left">
									<li>Full set of ReCharge features</li>
									<li>Top-notch customer support</li>
									<li>Integration with the best-of-breed apps</li>
								</ul>
							</div>
							<a href="https://www.shopifysubscriptions.com/app/install?utm_source=pricingpage&utm_medium=button&utm_campaign=pricingpage" target="_blank" class="rc_button rc_button_primary">Get started</a>
						</div>
					</div>
				</div>
				<div class="rc_layout__md__6">
					<div class="rc_pricing__plan rc_pricing__plan--pro rc_shadow_level5">
						<div class="rc_pricing__plan_header" >
							<span>ReCharge Pro</span>
							<div>
								<p>Over $100,000 in MRR</p>
							</div>
						</div>
						<div class="rc_pricing__plan_body">
							<p>Pricing built to scale</p>
							<h4>Contact our team</h4>
							<div>
								<ul class="rc_text--left">
									<li>Priority account manager</li>
									<li>Dedicated checkout servers</li>
									<li>Reduced processing fee</li>
								</ul>
							</div>
							<a href="/enterprise#become-pro" class="rc_button rc_button_secondary">Apply for Pro</a>
						</div>
					</div>		
				</div>
			</div>
		</div>
	</div>
	<div class="rc_section rc_pricing_faqs">
		<div class="rc_layout__container">
			<h2>Frequently asked questions</h2>
			<div id="rc_pricing_faqs_list" role="tablist">
				<a class="collapsed" data-toggle="collapse" href="#rc_pricing_faq1-details" aria-expanded="false" aria-controls="rc_pricing_faq1-details">
					<div class="card rc_shadow_level1">
						<div class="card-header" role="tab" id="rc_pricing_faq1">
							<h5>How does pricing work?</h5>
							<div><span></span></div>
						</div>
						<div id="rc_pricing_faq1-details" class="collapse" role="tabpanel" aria-labelledby="rc_pricing_faq1" data-parent="#rc_pricing_faqs_list">
							<div class="card-body">
								<p>ReCharge has a base fee of $19.99 per month plus 1% on recurring orders only. We do not charge you on non-recurring products. The 1% fee for ReCharge is only based on what was charged for the product itself, without shipping or taxes. You will also want to keep in mind that the payment processor (Stripe or Braintree) also carries a fee 2.9% + $0.30 per transaction. You do not get charged the Shopify payments fee of 2.9% + 0.30 that you would normally incur for non-recurring items.</p>
							</div>
						</div>
					</div>
				</a>
				<a class="collapsed" data-toggle="collapse" href="#rc_pricing_faq2-details" aria-expanded="false" aria-controls="rc_pricing_faq2-details">
					<div class="card rc_shadow_level1">
						<div class="card-header" role="tab" id="rc_pricing_faq2">
							<h5>How do I qualify for ReCharge Pro?</h5>
							<div><span></span></div>
						</div>
						<div id="rc_pricing_faq2-details" class="collapse" role="tabpanel" aria-labelledby="rc_pricing_faq2" data-parent="#rc_pricing_faqs_list">
							<div class="card-body">
								<p>Stores that have $100K in MRR or higher qualify for ReCharge Pro. Contact us <a class="rc_link" href="/enterprise#become-pro">here</a> to get reduced pricing.</p>
							</div>
						</div>
					</div>
				</a>
				<a class="collapsed" data-toggle="collapse" href="#rc_pricing_faq3-details" aria-expanded="false" aria-controls="rc_pricing_faq3-details">
					<div class="card rc_shadow_level1">
						<div class="card-header" role="tab" id="rc_pricing_faq3">
							<h5>What is the discount for ReCharge Pro?</h5>
							<div><span></span></div>
						</div>
						<div id="rc_pricing_faq3-details" class="collapse" role="tabpanel" aria-labelledby="rc_pricing_faq3" data-parent="#rc_pricing_faqs_list">
							<div class="card-body">
								<p>Pro stores receive a 30% discount. Instead of the standard 1% fee, the processing fee is reduced to 0.7%.</p>
							</div>
						</div>
					</div>
				</a>
				<a class="collapsed" data-toggle="collapse" href="#rc_pricing_faq4-details" aria-expanded="false" aria-controls="rc_pricing_faq4-details">
					<div class="card rc_shadow_level1">
						<div class="card-header" role="tab" id="rc_pricing_faq4">
							<h5>What is the discount for Shopify Plus stores?</h5>
							<div><span></span></div>
						</div>
						<div id="rc_pricing_faq4-details" class="collapse" role="tabpanel" aria-labelledby="rc_pricing_faq4" data-parent="#rc_pricing_faqs_list">
							<div class="card-body">
								<p>Shopify Plus stores automatically qualify for the Pro discount pricing regardless of your current MRR.</p>
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
</div>

<?php include('templates/static/footer.php'); ?>