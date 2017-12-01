<?php
	$page_title = 'One Click Upsell | Integrations';
	$page_description = 'Offer post-purchase upsells when a customer purchases a ReCharge subscription product.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal, one click upsell';
	$page_class = 'integration__details';
	$page_active = 'integration__one-click-upsell';
?>
<?php include('../templates/static/header.php'); ?>

<div class="rc_layout__container">
	<div class="rc_layout">
		<div class="rc_layout__sm__4">
			<img src="/assets/images/integrations/one-click-upsell_logo.png" alt="One Click Upsell logo" class="integration__details__logo">
		</div><!-- .grid__sm__4 -->
		<div class="rc_layout__sm__8">
			<div class="integration__details">
				<div class="integration__header">
					<h1 class="integration__title">One Click Upsell</h1>
				</div>
				<div class="integration__info">
					<p><a href="https://zipify.com/apps/ocu/" target="_blank" class="integration__website rc_link">https://zipify.com/apps/ocu/</a></p>
					<p>One Click Upsell allows you to add post-purchase upsells to your checkout sequence, increasing your average order revenue from subscribers.</p>
				</div>
				<h5>Supported features</h5>
				<ul class="integration__features rc_list_items">
					<li class="rc_tick_ok">Add a one time product post-purchase upsell to a subscription order</li>
					<li class="rc_tick_ok">Offer up to three post-purchase upsell products</li>
					<li class="rc_tick_ok">Offer a downsell product for customers who opt-out of the upsell</li>
				</ul>
			</div>
		</div>
	</div>
</div>

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