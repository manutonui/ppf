import { PDFViewer, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer"

const ClearancePDF = ({clearance}) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            paddingLeft: 30,
            paddingRight: 30,
            alignItems: 'center'
        },
        heading: {
            fontSize: 11,
            width: '180px',
        },
        miniHeading: {
            fontSize: 12,
            marginTop: 10,
        },
        mainMiniHeading: {
            fontSize: 16,
            marginTop: 15,
            fontWeight: 'bold',
        },
        miniHeadingSection: {
            paddingBottom: 10,
            borderBottom: '1px solid black',
            display: 'flex',
            alignItems: 'center',
            marginBottom: 10,
            width: '100%',
        },
        pdftitle: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        docref: {
            display: 'flex',
            flexDirection: 'row',
            fontSize: 10,
            justifyContent: 'space-between',
            width: '100%',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        refinfo: {
            width: '240px',
        },
        logo: {
            width: 100,
            height: 100,
            marginTop: 10,
            marginLeft: 20, marginRight: 20,
            textAlign: 'center'
        },
        certname: {
            textAlign: 'center',
            width: '100%',
            margin: 10,
            fontSize: 12,
        },
        toinfo: {
            marginTop: 8,
            marginBottom: 8,
            fontSize: 11,
            width: '100%',
        },
        personal: {
            fontSize: 10,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
        },
        personinfobox: {
            border: '1px solid #333',
            flex: 4,
            padding: 10,
        },
        personinfodesc: {
            width: '180px'
        },
        personimgs: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        persondp: {
            border: '1px solid black',
            flex: 1, padding: 2,
            opacity: 0.8
        },
        dp: {
            width: '100%',
            height: '100%'
        },
        oneRow: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 8,
        },
        disclaimer1: {
            marginTop: 30,
            marginBottom: 10,
            fontSize: 11,
            width: '80%'
        },
        disclaimer2: {
            marginTop: 10,
            marginBottom: 60,
            fontSize: 11,
            width: '80%'
        },
        stamp: {
            fontSize: 11,
            display: 'flex',
            alignItems: 'center'
        },
        stampgen: {
            marginTop: 10,
            fontSize: 11,
        },
        stampunit: {
            marginTop: 10,
            fontSize: 10,
        },
        stampcode: {
            marginTop: 10,
            fontSize: 10,
        },
        stampweb: {
            marginTop: 10,
        }
    })
    return (
        <PDFViewer style={{ width: '100%', height: '100%' }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.pdftitle}>
                        <Text style={styles.heading}>CIIDANKA BOOLIISKA PUNTLAND</Text>
                        <Image src="/assets/icons/ppf.png" style={styles.logo} />
                        <Text style={styles.heading}>PUNTLAND POLICE FORCE</Text>
                    </View>

                    <View style={styles.miniHeadingSection}>
                        <Text style={styles.miniHeading}>Hogaanka Baarista Dambiyada</Text>
                        <Text style={styles.miniHeading}>Criminal Investigation Department (CID)</Text>
                        <Text style={styles.mainMiniHeading}>Qaybta Hubinta Dambi La'aanta, Socdaalka & Faraha</Text>
                    </View>

                    <View style={styles.docref}>
                        <Text style={styles.refinfo}><b>Ref: </b>HBD/CID/DPL/4/23</Text>
                        <Text style={styles.refinfo}>CID-ICFPU-HQ</Text>
                        <Text style={styles.refinfo}>{new Date(clearance.date).toLocaleDateString()}</Text>
                    </View>

                    <Text style={styles.certname}>Certificate of Non-Criminal Record</Text>
                    <Text style={styles.toinfo}>To: Hay'adda Socdaalka iyo Jinsiyadaha</Text>

                    <View style={styles.personal}>
                        <View style={styles.personinfobox}>
                            <View style={styles.oneRow}>
                                <Text style={styles.personinfodesc}>Name:</Text>
                                <Text>{clearance.name}</Text>
                            </View>
                            <View style={styles.oneRow}>
                                <Text style={styles.personinfodesc}>Mother:</Text>
                                <Text>{clearance.mother}</Text>
                            </View>
                            <View style={styles.oneRow}>
                                <Text style={styles.personinfodesc}>Date of Birth:</Text>
                                <Text>{new Date(clearance.date).toLocaleDateString()}</Text>
                            </View>
                            <View style={styles.oneRow}>
                                <Text style={styles.personinfodesc}>Place of Birth:</Text>
                                <Text>{clearance.birthplace}</Text>
                            </View>
                            <View style={styles.oneRow}>
                                <Text style={styles.personinfodesc}>Residential Address:</Text>
                                <Text>{clearance.address}</Text>
                            </View>
                            <View style={styles.oneRow}>
                                <Text style={styles.personinfodesc}>Occupation:</Text>
                                <Text>{clearance.occupation}</Text>
                            </View>
                            <View style={styles.oneRow}>
                                <Text style={styles.personinfodesc}>Nationality:</Text>
                                <Text>{clearance.nationality}</Text>
                            </View>
                            <View style={styles.oneRow}>
                                <Text style={styles.personinfodesc}>Passport/ID:</Text>
                                <Text>{clearance.passport}</Text>
                            </View>
                            <View style={styles.oneRow}>
                                <Text style={styles.personinfodesc}>Telephone:</Text>
                                <Text>{clearance.telephone}</Text>
                            </View>
                            <View style={styles.oneRow}>
                                <Text style={styles.personinfodesc}>Minors:</Text>
                                <Text>{clearance.minors}</Text>
                            </View>
                        </View>
                        
                    </View>

                    <Text style={styles.disclaimer1}>Interview and Investigation conducted by the CID, The bearer of this certificate has no Criminal Record or involved any criminal activity in the past and present. According to his back-ground check and references, the bearer of this Document is not involved any terrorist activities in the past and present.</Text>
                    <Text style={styles.disclaimer2}>Kadib markii aanu baarnay, su'aalana waydiinay shakhsiga waa Shahaadadan, isla markaana dib u baadhnay Diiwaanka Waaxa Baarista Dambiyada ee CID-da, Baaris dheeri ahna ku samaynay shakhsiyadiisa, waxaa noo cadaatay in uusan dambi hore lahayn, lugna ku lahayn fal argagixiso.</Text>

                    <View style={styles.stamp}>
                        <Text style={styles.stampgen}>GENERAL: OMAR ABDI ELMI</Text>
                        <Text style={styles.stampunit}>Criminal Investigation Department</Text>
                        <Text style={styles.stampcode}>CID-ICFPU-HQ</Text>
                        <Text style={styles.stampunit}>Puntland State of Somalia, Police Force, Criminal Investigation Department, Fingerprint Unit</Text>
                        <Text style={styles.stampweb}>web: www.police.pl.so</Text>
                    </View>

                </Page>
            </Document>
        </PDFViewer>
    );
}
 
export default ClearancePDF;