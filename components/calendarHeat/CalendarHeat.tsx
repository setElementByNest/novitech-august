import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type WeekProps = {
    daylist: number[];
    problist: number[];
}

const CalendarHeat = ({ daylist, problist }: WeekProps) => {
    return (
        <View style={styles.weekstyle}>
            {daylist.map((d, index) => {
                return (
                    <View key={index} style={[styles.dayliststyle]}>
                        <Text style={styles.daytexttyle}>{d}</Text>
                        <View key={index} style={{ backgroundColor: `rgba(229, 58, 229, ${problist[index]})`, width: '100%', borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', aspectRatio: 1, marginTop: 2 }}>
                            <Text style={styles.proptexttyle}>{problist[index] * 100 + '%'}</Text>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    weekstyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        width: '100%',
        paddingVertical: 10,
        marginBottom: 4,
        gap: 0,
    },
    dayliststyle: {
        paddingVertical: 4,
        paddingHorizontal: 2,
        width: '14%',
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 6,
        // borderColor: '#ddd',
        // borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        height: 80,
    },
    daytexttyle: {
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
    proptexttyle: {
        fontSize: 14,
        fontFamily: 'Kanit400',
    },
})

export default CalendarHeat