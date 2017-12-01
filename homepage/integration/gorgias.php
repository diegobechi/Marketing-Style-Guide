<?php
	$page_title = 'Gorgias | Integrations';
	$page_description = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal, Littledata, Checkout Funnel, Product Customizer, Gorgias';
	$page_class = 'integration__details';
	$page_active = 'integration__gorgias';
?>
<?php include('../templates/static/header.php'); ?>

<div class="rc_layout__container">
	<div class="rc_layout">
		<div class="rc_layout__sm__4">
			<img src="/assets/images/integrations/gorgias_logo.png" alt="Gorgias logo" class="integration__details__logo">
		</div><!-- .grid__sm__4 -->
		<div class="rc_layout__sm__8">
			<div class="integration__details">
				<div class="integration__header">
					<h1 class="integration__title">Gorgias</h1>
				</div><!-- .integration__header -->
				<div class="integration__info">
					<p><a href="https://apps.shopify.com/helpdesk?&utm_campaign=integrations&utm_source=recharge&utm_medium=recharge_integration_page" target="_blank" class="integration__website">apps.shopify.com/gorgias</a></p>
					<p>Gorgias helps you provide lightning-fast customer support. Manage all your customer service in one place: email, chat, social media. Get a holistic view of the customer, by connecting all your Shopify apps. Maximize the efficiency of your team by editing orders directly from support conversations.</p>
				</div><!-- .integration__info -->
				<h5>Supported features</h5>
				<ul class="integration__features rc_list_items">
					<li class="rc_tick_ok">Display Recharge subscriptions next to support tickets</li>
					<li class="rc_tick_ok">Edit subscriptions in one click</li>
					<li class="rc_tick_ok">When a customer asks to edit their subscription, send them an auto-response with the link to manage the subscription</li>
				</ul><!-- .integration__features -->
			</div><!-- .integration__details -->
		</div><!-- .grid__sm__8 -->
	</div><!-- .layout -->
</div><!-- .container -->

<div class="rc_layout__background integration__explore">
	<div class="rc_layout__container">
		<h4>Explore other integrations</h4>
		<div class="rc_layout">
			<div class="rc_layout__full">
				<?php include('_listing.php'); ?>
			</div><!-- .layout__full -->
		</div><!-- .layout -->
	</div><!-- .container -->
</div><!-- .integration__explore -->

<?php include('../includes/footer.php'); ?>