import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme'

export default class Welcome extends React.Component {
    render() {

        const { navigation } = this.props;

        return (
            <Block flex style={styles.container}>
                <Block flex center>
                    <ImageBackground
                        source={require('../assets/images/shopping2.jpg')}
                        style={{ height: height, width: width,  marginTop: '-33%', zIndex: 1 }}
                    />
                </Block>

                <Block flex space="between" style={styles.padded}>
                    <Block flex space="around" style={{  marginTop: '-15%', zIndex: 2 }}>
                        <Block >
                            <Block >
                                <Text center color="white" bold size={60}>Smart</Text>
                            </Block>
                            <Block >
                                <Text center color="white" bold size={60}>Checkout</Text>
                            </Block>
                        </Block>
                        <Block space="around" center>
                            <Text size={20} muted>
                                Forget about long queues
                            </Text>
                            <Button
                                shadowless
                                style={styles.button}
                                color={materialTheme.COLORS.SUCCESS}
                                // onPress={() => navigation.navigate('LogIn')}>
                                onPress={() => navigation.navigate('AuthLoading')}>
                                GET STARTED
                            </Button>
                        </Block>
                    </Block>
                </Block>

            </ Block>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.BLACK,
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        position: 'relative',
        bottom: theme.SIZES.BASE,
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
    },
});
