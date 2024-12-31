import { createSystem, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
    cssVarsRoot: ':where(:root, :host)',
    cssVarsPrefix: 'ck',

    theme: {
        breakpoints: {
            sm: '320px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        },

        tokens: {
            colors: {
                gray: {
                    50: { value: '#F9FAFB' },
                    100: { value: '#F3F4F6' },
                    200: { value: '#E5E7EB' },
                    300: { value: '#D1D5DB' },
                    400: { value: '#9CA3AF' },
                    500: { value: '#6B7280' },
                    600: { value: '#4B5563' },
                    700: { value: '#374151' },
                    800: { value: '#1F2937' },
                    900: { value: '#111827' }
                }
            }
        },

        semanticTokens: {
            colors: {
                text: { value: '{colors.gray.900}' },
                background: { value: '{colors.gray.50}' },
                primary: { value: '{colors.gray.800}' },
                secondary: { value: '{colors.gray.600}' },
                accent: { value: '{colors.gray.400}' },
                muted: { value: '{colors.gray.200}' }
            }
        },

        textStyles: {
            heading: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                lineHeight: '1.2'
            },
            body: {
                fontFamily: 'sans-serif',
                fontWeight: 'normal',
                lineHeight: '1.5'
            }
        },

        layerStyles: {
            card: {
                bg: 'background',
                borderRadius: 'md',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }
        },

        animationStyles: {
            fadeIn: {
                keyframes: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                },
                duration: '0.3s',
                timingFunction: 'ease-in'
            }
        }
    },

    globalCss: {
        'html, body': {
            margin: 0,
            padding: 0,
            bg: 'background',
            color: 'text'
        }
    },

    conditions: {
        dark: '.chakra-ui-dark &',
        light: '.chakra-ui-light &'
    }
});

const system = createSystem(config);

export default system;
