export default renderInputs = (info) => {
    return (
      <Block flex style={styles.group}>
        {/* <Text bold size={16} style={styles.title}>Log in</Text> */}
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          {
            info.map((inputInfo, index) => (
              <Input
                right
                placeholder={inputInfo.placeholder}
                key={index}
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                iconContent={<Icon size={16} color={theme.COLORS.ICON} name={inputInfo.icon} family="GalioExtra" />}
                onChange={inputInfo.onChange}
              />
            ))
          }
        </Block>
      </Block>
    )
  }