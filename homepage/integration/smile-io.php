<?php
	$page_title = 'Smile.io | Integrations';
	$page_description = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal';
	$page_class = 'integration__details';
	$page_active = 'integration__smile.io';
?>
<?php include('../templates/static/header.php'); ?>

<div class="rc_layout__container">
	<div class="rc_layout">
		<div class="rc_layout__sm__4">
			<img src="/assets/images/integrations/smile-io_logo.png" alt="Smile.io logo" class="integration__details__logo">
		</div><!-- .rc_layout__sm__4 -->
		<div class="rc_layout__sm__8">
			<div class="integration__details">
				<div class="integration__header">
					<h1 class="integration__title">Smile.io</h1>
				</div><!-- .integration__header -->
				<div class="integration__info">
					<p><a href="https://apps.shopify.com/smile-io" target="_blank" class="integration__website rc_link">apps.shopify.com/smile-io</a></p>
					<p>Smile.io's Professional plan allows you to quickly set up and run your own rewards program that is fully integrated with ReCharge. Reward your recurring customers to increase retention and repeat purchases.</p>
				</div><!-- .integration__info -->
				<h5>Supported features</h5>
				<ul class="integration__features rc_list_items">
					<li class="rc_tick_ok">Reward customers for orders, customers can spend points on a discount on their next month's order.</li>
					<li class="rc_tick_ok">Apply one reward discount to an existing subscription or new subscription.</li>
				</ul><!-- .integration__features -->
			</div><!-- .integration__details -->
		</div><!-- .rc_layout__sm__8 -->
	</div><!-- .layout -->
</div><!-- .container -->

<div class="rc_layout__background integration__explore">
	<div class="container">
		<h4>Explore other integrations</h4>
		<div class="rc_layout">
			<div class="rc_layout__full">
				<?php include('_listing.php'); ?>
			</div><!-- .layout__full -->
		</div><!-- .layout -->
	</div><!-- .container -->
</div><!-- .integration__explore -->

<?php include('../includes/footer.php'); ?>