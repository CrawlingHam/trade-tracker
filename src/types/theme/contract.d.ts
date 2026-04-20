namespace Theme {
	interface Contract {
		/**
		 * Gets the theme from localStorage
		 * @returns {Theme} The theme
		 * @example
		 * ```ts
		 * const theme = getThemeFromLocalStorage();
		 * console.log(`Current theme: ${theme}`);
		 * ```
		 */
		getThemeFromLocalStorage: ThemeCallableSync;

		/**
		 * Applies the specified theme to the DOM by adding/removing classes and attributes
		 * @param isDark - Whether to apply dark mode (true) or light mode (false)
		 * @example
		 * ```ts
		 * applyThemeToDOM(true);  // Applies dark theme
		 * applyThemeToDOM(false); // Applies light theme
		 * ```
		 */
		applyThemeToDOM: Callable.Sync.Argument<boolean, void>;

		/**
		 * Returns the theme from a custom event or local storage
		 * @param event - The custom event containing the local storage theme
		 * @returns {Theme} The theme
		 */
		getThemeFromCustomEvent: Callable.Sync.Argument<CustomEvent<Theme>, Theme>;

		/**
		 * Gets the theme from a storage event or local storage
		 * @param event - The storage event
		 * @returns {Theme} The theme
		 */
		getThemeFromStorageEvent: Callable.Sync.Argument<StorageEvent, Theme>;

		/**
		 * Sets up theme initialization, system theme subscription, and storage synchronization.
		 * Accepts callbacks for theme changes and system theme changes.
		 * Returns a cleanup function to remove event listeners.
		 *
		 * @property setTheme - Function to set the application's theme state.
		 * @property initialize - Function to initialize the theme from storage or system preference.
		 * @property onThemeChange - Optional callback function called when the theme changes.
		 * @property onSystemThemeChange - Optional callback function called when the system theme changes.
		 * @returns {Callable.Sync.Void} Cleanup function to remove event listeners.
		 */
		setupThemeManagement: ({ setTheme, initialize, onThemeChange, onSystemThemeChange }: SetupThemeManagementProps) => Callable.Sync.Void;

		/**
		 * Gets the current system theme preference from the user's OS settings
		 * @returns {boolean} true if the system prefers dark mode, false if light mode
		 * @example
		 * ```ts
		 * const prefersDark = getSystemThemePreference();
		 * if (prefersDark) {
		 *   console.log('System prefers dark mode');
		 * }
		 * ```
		 */
		getSystemThemePreference: BooleanCallableSync;

		/**
		 * Determines if dark mode should be active based on the current theme setting
		 * @param theme - The theme setting to check ('dark' | 'light' | 'system')
		 * @returns {boolean} true if dark mode should be active, false otherwise
		 * @example
		 * ```ts
		 * const shouldDark = shouldUseDarkMode('system'); // Returns true if system prefers dark
		 * const shouldDark = shouldUseDarkMode('dark');   // Always returns true
		 * const shouldDark = shouldUseDarkMode('light');  // Always returns false
		 * ```
		 */
		shouldUseDarkMode: Callable.Sync.Argument<Theme, boolean>;

		/**
		 * Applies the theme to the DOM
		 * @param theme - The theme to apply
		 * @returns {void}
		 * @example
		 * ```ts
		 * applyTheme('dark');   // Applies dark theme
		 * applyTheme('light');  // Applies light theme
		 * applyTheme('system'); // Applies system preference
		 * ```
		 */
		applyTheme: Callable.Sync.Argument<Theme, void>;

		/**
		 * Sets the theme in localStorage and applies it to the DOM
		 * @param theme - The theme to set ('dark' | 'light' | 'system')
		 * @returns {void}
		 * @example
		 * ```ts
		 * setTheme('dark');   // Sets and applies dark theme
		 * setTheme('light');  // Sets and applies light theme
		 * setTheme('system'); // Sets theme to follow system preference
		 * ```
		 */
		setTheme: Callable.Sync.Argument<Theme, void>;

		/**
		 * Initializes the theme from localStorage or falls back to system preference
		 * @returns {Theme} The initialized theme ('dark' | 'light' | 'system')
		 * @example
		 * ```ts
		 * const theme = initializeTheme();
		 * console.log(`Current theme: ${theme}`);
		 * ```
		 */
		initializeTheme: Callable.Sync.Generic<Theme>;

		/**
		 * Subscribes to system theme changes and calls the provided callback when changes occur.
		 * The callback is responsible for reading theme state and applying DOM (e.g. when theme is "system").
		 *
		 * @param callback - Function to call when system theme changes, receives boolean indicating if dark mode is active
		 * @returns {Callable.Sync.Void} Cleanup function to remove the event listener
		 * @example
		 * ```ts
		 * const unsubscribe = subscribeToSystemTheme((isDark) => {
		 *   console.log(`System theme changed to: ${isDark ? 'dark' : 'light'}`);
		 * });
		 *
		 * // Later, to cleanup:
		 * unsubscribe();
		 * ```
		 */
		subscribeToSystemTheme: (callback: Callable.Sync.Argument<boolean, void>) => Callable.Sync.Void;
	}
}
