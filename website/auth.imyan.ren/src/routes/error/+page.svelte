<div class="error-page">
  <div class="error-card">
    <h1>ACCESS DENIED</h1>
    <p class="message">
      Your identity has been verified, but you are not on the authorized
      personnel list.
    </p>
    <div class="error-code">ERROR_CODE: WHITELIST_REJECTION</div>
    <a href="/" class="back-link">Return to Login</a>
  </div>
</div>

<style>
  .error-page {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: var(--c-bg);
    color: var(--c-text);
    font-family: 'Fira Code', 'Consolas', monospace;
  }

  .error-card {
    width: min(100%, 28rem);
    padding: 2rem;
    text-align: center;
    border: 1px solid color-mix(in srgb, #ff3c3c 45%, var(--c-border));
    background: var(--c-card-bg);
    border-radius: 0.5rem;
  }

  h1 {
    margin: 0 0 1rem;
    color: #ff3c3c;
    font-size: clamp(2rem, 6vw, 2.5rem);
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  .message {
    margin: 0 0 1.5rem;
    color: color-mix(in srgb, var(--c-text) 70%, transparent);
    line-height: 1.7;
  }

  .error-code {
    margin-bottom: 1.5rem;
    padding: 0.6rem 0.75rem;
    border: 1px solid color-mix(in srgb, #ff3c3c 25%, transparent);
    background: color-mix(in srgb, #ff3c3c 10%, transparent);
    color: color-mix(in srgb, #ff3c3c 80%, var(--c-text));
    font-size: 0.75rem;
    letter-spacing: 0.04em;
  }

  .back-link {
    color: color-mix(in srgb, var(--c-text) 65%, transparent);
    font-size: 0.875rem;
    text-decoration: underline;
    text-decoration-style: dashed;
    text-underline-offset: 4px;
    transition: color 0.2s;
  }

  .back-link:hover,
  .back-link:focus-visible {
    color: var(--c-text-hover);
  }
</style>
